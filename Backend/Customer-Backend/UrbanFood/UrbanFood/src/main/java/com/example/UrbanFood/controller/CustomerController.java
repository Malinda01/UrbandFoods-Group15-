package com.example.UrbanFood.controller;


import com.example.UrbanFood.DTO.CartItemRequest;
import com.example.UrbanFood.DTO.CustomerRequest;
import com.example.UrbanFood.DTO.CustomerUpdateRequest;
import com.example.UrbanFood.DTO.LoginRequest;
import com.example.UrbanFood.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping("/add")
    public String addCustomer(@RequestBody CustomerRequest customerRequest) {
        try {
            customerService.addCustomer(
                    customerRequest.getName(),
                    customerRequest.getPhone(),
                    customerRequest.getAddress(),
                    customerRequest.getEmail(),
                    customerRequest.getPassword()
            );
            return "Customer added successfully.";
        } catch (Exception e) {
            return "Error adding customer: " + e.getMessage();
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> loginCustomer(@RequestBody LoginRequest loginRequest) {
        Map<String, Object> profile = customerService.loginAndFetchProfile(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );

        if (profile != null) {
            return ResponseEntity.ok(profile);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
        }
    }


    @PatchMapping("/update/{id}")
    public ResponseEntity<String> updateCustomer(@PathVariable String id, @RequestBody CustomerUpdateRequest request) {
        try {
            Map<String, Object> updates = new HashMap<>();
            if (request.getName() != null) updates.put("name", request.getName());
            if (request.getPhone() != null) updates.put("phone", request.getPhone());
            if (request.getAddress() != null) updates.put("address", request.getAddress());
            if (request.getEmail() != null) updates.put("email", request.getEmail());
            if (request.getPassword() != null) updates.put("password", request.getPassword());

            customerService.updateCustomer(id, updates);
            return ResponseEntity.ok("Customer updated successfully.");
        } catch (Exception e) {
            e.printStackTrace(); // Log it
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating customer: " + e.getMessage());
        }
    }


    @PostMapping("/cart/add")
    public ResponseEntity<?> addProductToCart(@RequestBody CartItemRequest request) {
        customerService.addProductToCart(request);
        return ResponseEntity.ok("Product added to cart");
    }

    @PostMapping("/cart/delete")
    public ResponseEntity<String> deleteCartItem(@RequestBody CartItemRequest request) {
        customerService.deleteCartItem(request);
        return ResponseEntity.ok("Item removed from cart.");
    }

    @PostMapping("/cart/clear")
    public ResponseEntity<String> clearCart(@RequestBody Map<String, String> request) {
        String customerId = request.get("customerId");
        customerService.clearCart(customerId);
        return ResponseEntity.ok("Cart cleared.");
    }

    @PostMapping("/cart/remove")
    public ResponseEntity<String> removeFromCart(@RequestBody CartItemRequest request) {
        customerService.removeFromCart(request);
        return ResponseEntity.ok("Item removed from cart.");
    }

}

