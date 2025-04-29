package com.example.Delivery.Service;

import com.example.Delivery.DTO.DeliveryDetailsRequest;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.StoredProcedureQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DeliveryService {

    @Autowired
    private EntityManager entityManager;

    @Transactional
    public String updateDeliveryStatus(String orderId, String newStatus) {
        StoredProcedureQuery query = entityManager
                .createStoredProcedureQuery("update_delivery_status");
        query.registerStoredProcedureParameter("p_order_id", String.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("p_new_status", String.class, ParameterMode.IN);

        query.setParameter("p_order_id", orderId);
        query.setParameter("p_new_status", newStatus);

        query.execute();
        return "Delivery status updated for order ID: " + orderId;
    }

    @Transactional
    public List<DeliveryDetailsRequest> viewDeliveryDetails(String orderId) {
        Query query = entityManager.createNativeQuery(
                "SELECT d.delivery_id, d.order_id, d.delivery_status, " +
                        "dp.name AS delivery_person, o.order_date, o.total_amount " +
                        "FROM delivery d " +
                        "JOIN delivery_person dp ON d.d_person_id = dp.d_person_id " +
                        "JOIN orders o ON d.order_id = o.order_id " +
                        "WHERE UPPER(d.order_id) = UPPER(?)"
        );


        query.setParameter(1, orderId);

        List<Object[]> results = query.getResultList();
        List<DeliveryDetailsRequest> dtoList = new ArrayList<>();

        if (results.isEmpty()) {
            return dtoList;  // Return empty list if no results
        }

        for (Object[] row : results) {
            DeliveryDetailsRequest dto = new DeliveryDetailsRequest();
            dto.setDeliveryId((String) row[0]);
            dto.setOrderId((String) row[1]);
            dto.setDeliveryStatus((String) row[2]);
            dto.setDeliveryPerson((String) row[3]);

            // Handle date formatting
            try {
                dto.setOrderDate(row[4].toString());  // This will call .toString() on date
            } catch (Exception e) {
                dto.setOrderDate("Invalid Date Format");
            }

            try {
                dto.setTotalAmount(Double.parseDouble(row[5].toString()));
            } catch (Exception e) {
                dto.setTotalAmount(0.0); // Default value in case of error
            }

            dtoList.add(dto);
        }

        return dtoList;
    }

    @Transactional
    public List<DeliveryDetailsRequest> getAllDeliveryDetails() {
        StoredProcedureQuery query = entityManager
                .createStoredProcedureQuery("get_all_delivery_details");

        query.registerStoredProcedureParameter(1, void.class, ParameterMode.REF_CURSOR);

        query.execute();
        List<Object[]> results = query.getResultList();
        List<DeliveryDetailsRequest> dtoList = new ArrayList<>();

        for (Object[] row : results) {
            DeliveryDetailsRequest dto = new DeliveryDetailsRequest();
            dto.setDeliveryId((String) row[0]);
            dto.setOrderId((String) row[1]);
            dto.setDeliveryStatus((String) row[2]);
            dto.setDeliveryPerson((String) row[3]);

            try {
                dto.setOrderDate(row[4].toString());
            } catch (Exception e) {
                dto.setOrderDate("Invalid Date");
            }

            try {
                dto.setTotalAmount(Double.parseDouble(row[5].toString()));
            } catch (Exception e) {
                dto.setTotalAmount(0.0);
            }

            dtoList.add(dto);
        }

        return dtoList;
    }


}

