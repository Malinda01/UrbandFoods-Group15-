package com.example.UrbanFood.controller;

import com.example.UrbanFood.DTO.OrderRequest;
import com.example.UrbanFood.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/customers/cart")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/pay")
    public ResponseEntity<Map<String, String>> prepareOrder(@RequestBody Map<String, String> payload) {
        String customerId = payload.get("customerId");
        String orderId = orderService.prepareOrder(customerId);
        return ResponseEntity.ok(Collections.singletonMap("orderId", orderId));
    }

    @PostMapping("/confirm")
    public ResponseEntity<Map<String, String>> confirmOrder(@RequestBody Map<String, String> body) {
        String customerId = body.get("customerId");
        String orderId = body.get("orderId");
        // Log the received orderId and customerId for debugging
        System.out.println("Received Order ID: " + orderId);
        System.out.println("Received Customer ID: " + customerId);

        orderService.confirmOrder(orderId, customerId);

        Map<String, String> response = new HashMap<>();
        response.put("orderId", orderId); // Send it back

        System.out.println("Response: " + response);
        return ResponseEntity.ok(response);

    }


    @PostMapping("/cancel")
    public ResponseEntity<String> cancelOrder(@RequestBody Map<String, String> payload) {
        orderService.cancelOrder(payload.get("orderId"));
        return ResponseEntity.ok("Order canceled");
    }


    //review part codes
    @PostMapping("/latest")
    public ResponseEntity<List<Map<String, Object>>> getLastFiveOrders(@RequestBody Map<String, String> request) {
        String customerId = request.get("customerId");
        List<Map<String, Object>> orders = orderService.getLastFiveOrders(customerId);
        return ResponseEntity.ok(orders);
    }

    @PostMapping("/products")
    public ResponseEntity<List<Map<String, Object>>> getOrderProducts(@RequestBody Map<String, String> payload) {
        String orderId = payload.get("orderId");
        List<Map<String, Object>> products = orderService.getOrderProducts(orderId);
        return ResponseEntity.ok(products);
    }


}
