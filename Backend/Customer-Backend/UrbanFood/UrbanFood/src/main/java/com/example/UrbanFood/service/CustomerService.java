package com.example.UrbanFood.service;

import com.example.UrbanFood.DTO.CartItemRequest;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;

import java.sql.Types;
import java.util.HashMap;
import java.util.Map;

@Service
public class CustomerService {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    private SimpleJdbcCall updateCustomerCall;

    @PostConstruct
    public void init() {
        updateCustomerCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("UPDATE_CUSTOMER")
                .withSchemaName("GRESHANNEW"); // Your schema name
    }

    public void addCustomer(String name, String phone, String address, String email, String password) {
        String sql = "BEGIN ADD_CUSTOMER(?, ?, ?, ?, ?); END;";
        jdbcTemplate.update(sql, name, phone, address, email, password);
    }


   /* public boolean loginCustomer(String email, String password) {
        String sql = "SELECT LOGIN_CUSTOMER(?, ?) FROM dual";
        Integer result = jdbcTemplate.queryForObject(sql, Integer.class, email, password);
        return result != null && result == 1;
    }*/

    public Map<String, Object> loginAndFetchProfile(String email, String password) {
        String sql = "SELECT LOGIN_CUSTOMER(?, ?) FROM dual";
        Integer result = jdbcTemplate.queryForObject(sql, Integer.class, email, password);

        if (result != null && result == 1) {
            // Login successful → fetch customer profile
            String fetchSql = "SELECT CUSTOMER_ID, CUS_NAME, CUS_PHONE, CUS_ADDRESS, CUS_EMAIL, CUS_PASSWORD FROM GRESHANNEW.CUSTOMER WHERE CUS_EMAIL = ?";
            return jdbcTemplate.queryForMap(fetchSql, email);
        } else {
            return null;
        }
    }




    public void updateCustomer(String customerId, Map<String, Object> updates) {
        Map<String, Object> inParams = new HashMap<>();

        inParams.put("p_customer_id", customerId); // Required param

        // Optional params — put them only if provided, else leave null
        inParams.put("p_name", updates.getOrDefault("name", null));
        inParams.put("p_phone", updates.getOrDefault("phone", null));
        inParams.put("p_address", updates.getOrDefault("address", null));
        inParams.put("p_email", updates.getOrDefault("email", null));
        inParams.put("p_password", updates.getOrDefault("password", null));

        updateCustomerCall.execute(inParams);
    }



    public void addProductToCart(CartItemRequest request) {
        // Activate the cart first
        jdbcTemplate.update("BEGIN activate_cart(?); END;", request.getCustomerId());

        // Add or update product in cart with quantity
        jdbcTemplate.update("BEGIN add_to_cart(?, ?, ?, ?); END;",
                request.getCustomerId(),
                request.getProductId(),
                request.getPrice(),
                request.getQuantity()); // Pass quantity here!
    }

    public void deleteCartItem(CartItemRequest request) {
        jdbcTemplate.update("BEGIN delete_from_cart(?, ?); END;",
                request.getCustomerId(), request.getProductId());
    }

    public void clearCart(String customerId) {
        jdbcTemplate.update("BEGIN clear_cart(?); END;", customerId);
    }

    public void removeFromCart(CartItemRequest request) {
        jdbcTemplate.update("BEGIN remove_from_cart(?, ?); END;",
                request.getCustomerId(), request.getProductId());
    }


}



