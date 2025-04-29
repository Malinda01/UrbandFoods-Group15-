package com.example.Delivery.Service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.Query;
import jakarta.persistence.StoredProcedureQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class DpersonService {

    @Autowired //dependacy injection
    private EntityManager entityManager;

    //    Register - working
    @Transactional
    public  void add_new_D_person(String Name, String Email, String Address, String company_name, String password) {
        // Call the stored procedure without the supplierId
        Query query = entityManager.createNativeQuery("{ call add_new_D_person( ?, ?, ?, ?, ?) }");
        query.setParameter(1, Name);
        query.setParameter(2, Email);
        query.setParameter(3, Address);
        query.setParameter(4, company_name);
        query.setParameter(5, password);


        query.executeUpdate();
    }

    //    Login - In Progress
    @Transactional
    public  String login_Dperson(String email, String password) {
        Query query = entityManager.createNativeQuery("SELECT login_D_person(?, ?) FROM dual");
        query.setParameter(1, email);
        query.setParameter(2, password);

        Object result = query.getSingleResult();
        return result != null ? result.toString() : null;
    }

    //Supplier Profile populate
    @Transactional
    public Map<String, Object> getDpersonDetails(String D_Person_id) {
        StoredProcedureQuery query = entityManager.createStoredProcedureQuery("GET_D_PERSON_DETAILS");

        // Register input and output parameters
        query.registerStoredProcedureParameter("p_D_Person_id", String.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("p_name", String.class, ParameterMode.OUT);
        query.registerStoredProcedureParameter("p_email", String.class, ParameterMode.OUT);
        query.registerStoredProcedureParameter("p_address", String.class, ParameterMode.OUT);
        query.registerStoredProcedureParameter("p_company_name", String.class, ParameterMode.OUT);
        query.registerStoredProcedureParameter("p_password", String.class, ParameterMode.OUT);


        // Set input parameter
        query.setParameter("p_D_Person_id", D_Person_id);

        // Execute stored procedure
        query.execute();

        // Retrieve output parameters
        Map<String, Object> result = new HashMap<>();
        result.put("D_Person_id", D_Person_id);
        result.put("name", query.getOutputParameterValue("p_name"));
        result.put("email", query.getOutputParameterValue("p_email"));
        result.put("address", query.getOutputParameterValue("p_address"));
        result.put("company_name", query.getOutputParameterValue("p_company_name"));
        result.put("password", query.getOutputParameterValue("p_password"));


        return result;
    }



    //    Update - Completed
    @Transactional
    public  void updateDperson(String D_Person_id, String Name, String email,
                               String address, String company_name, String password) {
        Query query = entityManager.createNativeQuery("{ call update_D_person(?, ?, ?, ?, ?, ?) }");
        query.setParameter(1, D_Person_id);
        query.setParameter(2, Name);
        query.setParameter(3, email);
        query.setParameter(4, address);
        query.setParameter(5, company_name);
        query.setParameter(6, password);


        query.executeUpdate();
    }
}
