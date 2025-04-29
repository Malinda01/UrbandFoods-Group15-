package com.example.UrbanFood.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.ColumnMapRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.Types;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service // This makes the class a Spring Bean
public class OrderService {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public String prepareOrder(String customerId) {
        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("stash_order")
                .declareParameters(
                        new SqlParameter("p_customer_id", Types.VARCHAR),
                        new SqlOutParameter("p_order_id", Types.VARCHAR)
                );


        Map<String, Object> result = call.execute(new MapSqlParameterSource()
                .addValue("p_customer_id", customerId));

        System.out.println("Procedure Result: " + result);  // 🔍 Debug line

        // Try getting both cases
        String orderId = (String) result.get("p_order_id");
        if (orderId == null) {
            orderId = (String) result.get("P_ORDER_ID");
        }

        return orderId;
    }

    public void confirmOrder(String orderId, String customerId) {
        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("confirm_order")
                .declareParameters(
                        new SqlParameter("p_order_id", Types.VARCHAR),
                        new SqlParameter("p_customer_id", Types.VARCHAR)
                );

        call.execute(new MapSqlParameterSource()
                .addValue("p_order_id", orderId)
                .addValue("p_customer_id", customerId));
    }


    public void cancelOrder(String orderId) {
        jdbcTemplate.update("BEGIN cancel_order(?); END;", orderId);
    }

    //review part codes below
    @Autowired
    private DataSource dataSource;

    public List<Map<String, Object>> getLastFiveOrders(String customerId) {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("get_customer_orders")
                .returningResultSet("o_orders", new ColumnMapRowMapper());

        Map<String, Object> inParams = new HashMap<>();
        inParams.put("p_customer_id", customerId);

        Map<String, Object> result = jdbcCall.execute(new MapSqlParameterSource(inParams));
        List<Map<String, Object>> orders = (List<Map<String, Object>>) result.get("o_orders");

        return orders;
    }

    public List<Map<String, Object>> getOrderProducts(String orderId) {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("get_order_products")
                .returningResultSet("o_products", new ColumnMapRowMapper());

        Map<String, Object> inParams = new HashMap<>();
        inParams.put("p_order_id", orderId);

        Map<String, Object> result = jdbcCall.execute(new MapSqlParameterSource(inParams));
        List<Map<String, Object>> products = (List<Map<String, Object>>) result.get("o_products");

        return products;
    }


}


