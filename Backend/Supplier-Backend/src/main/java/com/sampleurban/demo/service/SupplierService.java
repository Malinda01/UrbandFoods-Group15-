package com.sampleurban.demo.service;

//import com.sampleurban.demo.repository.SupplierRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.Query;
import jakarta.persistence.StoredProcedureQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Supplier;

@Service
public class SupplierService {

    @Autowired //dependacy injection
    private EntityManager entityManager;

//    Register - working
    @Transactional
    public void addSupplier(String supplierName, String email, String phoneNumber, String address, String pass, String supplierType) {
        // Call the stored procedure without the supplierId
        Query query = entityManager.createNativeQuery("{ call add_new_sup( ?, ?, ?, ?, ?, ?) }");
        query.setParameter(1, supplierName);
        query.setParameter(2, email);
        query.setParameter(3, phoneNumber);
        query.setParameter(4, address);
        query.setParameter(5, pass);
        query.setParameter(6, supplierType);  // Pass the supplierType here

        query.executeUpdate();
    }

//    Login - In Progress
@Transactional
public String loginSupplier(String email, String password) {
    Query query = entityManager.createNativeQuery("SELECT login_supp(?, ?) FROM dual");
    query.setParameter(1, email);
    query.setParameter(2, password);

    Object result = query.getSingleResult();
    return result != null ? result.toString() : null;
}

//Supplier Profile populate
@Transactional
public Map<String, Object> getSupplierDetails(String supplierId) {
    StoredProcedureQuery query = entityManager.createStoredProcedureQuery("GET_SUPPLIER_DETAILS");

    // Register input and output parameters
    query.registerStoredProcedureParameter("p_supplier_id", String.class, ParameterMode.IN);
    query.registerStoredProcedureParameter("p_name", String.class, ParameterMode.OUT);
    query.registerStoredProcedureParameter("p_email", String.class, ParameterMode.OUT);
    query.registerStoredProcedureParameter("p_phone", String.class, ParameterMode.OUT);
    query.registerStoredProcedureParameter("p_address", String.class, ParameterMode.OUT);
    query.registerStoredProcedureParameter("p_pass", String.class, ParameterMode.OUT);
    query.registerStoredProcedureParameter("p_type", String.class, ParameterMode.OUT);

    // Set input parameter
    query.setParameter("p_supplier_id", supplierId);

    // Execute stored procedure
    query.execute();

    // Retrieve output parameters
    Map<String, Object> result = new HashMap<>();
    result.put("supplierId", supplierId);
    result.put("name", query.getOutputParameterValue("p_name"));
    result.put("email", query.getOutputParameterValue("p_email"));
    result.put("phone", query.getOutputParameterValue("p_phone"));
    result.put("address", query.getOutputParameterValue("p_address"));
    result.put("password", query.getOutputParameterValue("p_pass"));
    result.put("supplierType", query.getOutputParameterValue("p_type"));

    return result;
}



    //    Update - Completed
    @Transactional
    public void updateSupplier(String supplierId, String supplierName, String email, String phoneNumber,
                               String address, String pass, String supplierType) {
        Query query = entityManager.createNativeQuery("{ call update_supplier(?, ?, ?, ?, ?, ?, ?) }");
        query.setParameter(1, supplierId);
        query.setParameter(2, supplierName);
        query.setParameter(3, email);
        query.setParameter(4, phoneNumber);
        query.setParameter(5, address);
        query.setParameter(6, pass);
        query.setParameter(7, supplierType);

        query.executeUpdate();
    }

}
