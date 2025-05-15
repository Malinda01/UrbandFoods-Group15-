package com.sampleurban.demo.controller;

import com.sampleurban.demo.DTO.SupplierRequest;
import com.sampleurban.demo.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;
import java.util.function.Supplier;

@RestController
@RequestMapping("/api/suppliers")
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

//    Register - Working
    @PostMapping("/add")
    public String addSupplier(@RequestBody SupplierRequest supplierRequest) {
        try {
            supplierService.addSupplier(
                    supplierRequest.getSupplierName(),
                    supplierRequest.getEmail(),
                    supplierRequest.getPhoneNumber(),
                    supplierRequest.getAddress(),
                    supplierRequest.getPass(),
                    supplierRequest.getSupplierType()
            );
            return "Supplier added successfully.";
        } catch (Exception e) {
            return "Error adding supplier: " + e.getMessage();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginSupplier(@RequestParam String email, @RequestParam String password) {
        String supplierId = supplierService.loginSupplier(email, password);

        if (supplierId != null) {
            return ResponseEntity.ok(supplierId); // send supplier ID to frontend
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login Failed");
        }
    }

    //Populate profile
    @GetMapping("/details/{supplierId}")
    public ResponseEntity<Map<String, Object>> getSupplierDetails(@PathVariable String supplierId) {
        try {
            Map<String, Object> supplierDetails = supplierService.getSupplierDetails(supplierId);
            return ResponseEntity.ok(supplierDetails);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "Error fetching supplier details: " + e.getMessage()));
        }
    }


    //    Update - Working
    @PutMapping("/update")
    public ResponseEntity<String> updateSupplier(@RequestBody SupplierRequest supplierRequest) {
        try {
            supplierService.updateSupplier(
                    supplierRequest.getSupplierId(),
                    supplierRequest.getSupplierName(),
                    supplierRequest.getEmail(),
                    supplierRequest.getPhoneNumber(),
                    supplierRequest.getAddress(),
                    supplierRequest.getPass(),
                    supplierRequest.getSupplierType()
            );
            return ResponseEntity.ok("Supplier updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating supplier: " + e.getMessage());
        }
    }


}
