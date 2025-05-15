package com.sampleurban.demo.service;

import com.sampleurban.demo.DTO.ProductRequest;
import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private EntityManager entityManager;

    @Transactional
    public void addProduct(String name, double price, int quantity, String category,
                           String description, String imageUrl, String supplierId) {
        var query = entityManager.createNativeQuery("{ call add_product(?, ?, ?, ?, ?, ?, ?) }");
        query.setParameter(1, name); // no need to pass 'id', it will be auto-generated
        query.setParameter(2, price);
        query.setParameter(3, quantity);
        query.setParameter(4, category);
        query.setParameter(5, description);
        query.setParameter(6, imageUrl);
        query.setParameter(7, supplierId);
        query.executeUpdate();
    }

//    Populate the Product update form
@Transactional
public ProductRequest getProductById(String productId) {
    StoredProcedureQuery query = entityManager
            .createStoredProcedureQuery("get_product_by_id")
            .registerStoredProcedureParameter("p_product_id", String.class, ParameterMode.IN)
            .registerStoredProcedureParameter("p_name", String.class, ParameterMode.OUT)
            .registerStoredProcedureParameter("p_price", Double.class, ParameterMode.OUT)
            .registerStoredProcedureParameter("p_quantity", Integer.class, ParameterMode.OUT)
            .registerStoredProcedureParameter("p_category", String.class, ParameterMode.OUT)
            .registerStoredProcedureParameter("p_description", String.class, ParameterMode.OUT)
            .registerStoredProcedureParameter("p_img_url", String.class, ParameterMode.OUT)
            .registerStoredProcedureParameter("p_supplier_id", String.class, ParameterMode.OUT)
            .setParameter("p_product_id", productId);

    query.execute();

    ProductRequest product = new ProductRequest();
    product.setProductId(productId);
    product.setname((String) query.getOutputParameterValue("p_name"));
    product.setPrice((Double) query.getOutputParameterValue("p_price"));
    product.setQuantity((Integer) query.getOutputParameterValue("p_quantity"));
    product.setCategory((String) query.getOutputParameterValue("p_category"));
    product.setDescription((String) query.getOutputParameterValue("p_description"));
    product.setImageUrl((String) query.getOutputParameterValue("p_img_url"));
    product.setSupplierId((String) query.getOutputParameterValue("p_supplier_id"));

    return product;
}



    @Transactional
    public void updateProductUsingProcedure(String productId, String supplierId, ProductRequest request) {
        StoredProcedureQuery query = entityManager
                .createStoredProcedureQuery("update_product")
                .registerStoredProcedureParameter("p_product_id", String.class, ParameterMode.IN)
                .registerStoredProcedureParameter("p_product_name", String.class, ParameterMode.IN)
                .registerStoredProcedureParameter("p_price", Double.class, ParameterMode.IN)
                .registerStoredProcedureParameter("p_quantity", Integer.class, ParameterMode.IN)
                .registerStoredProcedureParameter("p_category", String.class, ParameterMode.IN)
                .registerStoredProcedureParameter("p_description", String.class, ParameterMode.IN)
//                .registerStoredProcedureParameter("p_image_url", String.class, ParameterMode.IN)
                .registerStoredProcedureParameter("p_supplier_id", String.class, ParameterMode.IN)
                .setParameter("p_product_id", productId)
                .setParameter("p_product_name", request.getname())
                .setParameter("p_price", request.getPrice())
                .setParameter("p_quantity", request.getQuantity())
                .setParameter("p_category", request.getCategory())
                .setParameter("p_description", request.getDescription())
//                .setParameter("p_image_url", request.getImageUrl())
                .setParameter("p_supplier_id", supplierId);

        query.execute();
    }



    @Transactional
    public void deleteProduct(String id) {
        var query = entityManager.createNativeQuery("{ call delete_product(?) }");
        query.setParameter(1, id);
        query.executeUpdate();
    }

    @Transactional
    public List<ProductRequest> getProductsBySupplier(String supplierId) {
        StoredProcedureQuery query = entityManager
                .createStoredProcedureQuery("get_products_by_supplier")
                .registerStoredProcedureParameter(1, String.class, ParameterMode.IN)
                .registerStoredProcedureParameter(2, void.class, ParameterMode.REF_CURSOR);

        query.setParameter(1, supplierId);
        query.execute();

        List<Object[]> resultList = query.getResultList();
        List<ProductRequest> products = new ArrayList<>();

        for (Object[] row : resultList) {
            ProductRequest product = new ProductRequest();
            product.setProductId((String) row[0]);
            product.setname((String) row[1]);
            product.setPrice(((Number) row[2]).doubleValue());
            product.setQuantity(((Number) row[3]).intValue());
            product.setCategory((String) row[4]);
            product.setDescription((String) row[5]);
            product.setImageUrl((String) row[6]);
            product.setSupplierId((String) row[7]);
            products.add(product);
        }

        return products;
    }

//    Sales
@Transactional
public double getSupplierSalesInPeriod(String supplierId, java.sql.Timestamp startDate, java.sql.Timestamp endDate) {
    StoredProcedureQuery query = entityManager
            .createStoredProcedureQuery("get_supplier_sales_in_period")
            .registerStoredProcedureParameter("p_supplier_id", String.class, ParameterMode.IN)
            .registerStoredProcedureParameter("p_start_date", java.sql.Timestamp.class, ParameterMode.IN)
            .registerStoredProcedureParameter("p_end_date", java.sql.Timestamp.class, ParameterMode.IN)
            .registerStoredProcedureParameter("p_total_sales", Double.class, ParameterMode.OUT)
            .setParameter("p_supplier_id", supplierId)
            .setParameter("p_start_date", startDate)
            .setParameter("p_end_date", endDate);

    query.execute();
    Object result = query.getOutputParameterValue("p_total_sales");

    return result != null ? ((Number) result).doubleValue() : 0.0;
}

// High demand
@Transactional
public List<ProductRequest> getHighDemandProducts(String supplierId) {
    StoredProcedureQuery query = entityManager
            .createStoredProcedureQuery("get_high_demand_products")
            .registerStoredProcedureParameter(1, String.class, ParameterMode.IN)
            .registerStoredProcedureParameter(2, void.class, ParameterMode.REF_CURSOR)
            .setParameter(1, supplierId);

    query.execute();
    List<Object[]> results = query.getResultList();
    List<ProductRequest> products = new ArrayList<>();

    for (Object[] row : results) {
        // Skip message row if no products sold
        if (row[0] instanceof String && "No products sold".equals(row[0])) continue;

        ProductRequest product = new ProductRequest();
        product.setProductId((String) row[0]);
        product.setname((String) row[1]);
        product.setQuantity(((Number) row[2]).intValue());  // total_quantity
        products.add(product);
    }

    return products;
}





}
