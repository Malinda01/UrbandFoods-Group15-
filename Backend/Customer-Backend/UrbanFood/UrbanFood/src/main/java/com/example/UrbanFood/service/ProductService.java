package com.example.UrbanFood.service;

import com.example.UrbanFood.DTO.ProductDTO;
import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.StoredProcedureQuery;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    @PersistenceContext
    private EntityManager entityManager;

    public List<ProductDTO> getAllProducts() {
        StoredProcedureQuery query = entityManager.createStoredProcedureQuery("product_pkg.get_all_products");

        query.registerStoredProcedureParameter(1, void.class, ParameterMode.REF_CURSOR);
        query.execute();

        List<Object[]> results = query.getResultList();
        List<ProductDTO> products = new ArrayList<>();

        for (Object[] row : results) {
            ProductDTO product = new ProductDTO();
            product.setProductId((String) row[0]);
            product.setName((String) row[1]);
            product.setPrice(((Number) row[2]).doubleValue());
            product.setQuantity(((Number) row[3]).intValue());
            product.setCategory((String) row[4]);
            product.setDescription((String) row[5]);
            product.setImgUrl((String) row[6]);
            product.setSupplierId((String) row[7]);
            products.add(product);
        }

        return products;
    }
}
