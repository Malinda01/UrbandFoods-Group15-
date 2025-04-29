package com.example.Delivery.Controller;

import com.example.Delivery.DTO.DeliveryDetailsRequest;
import com.example.Delivery.DTO.DeliveryStatusUpdateRequest;
import com.example.Delivery.Service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/delivery")
public class Delivery_Controller {

    @Autowired
    private DeliveryService deliveryService;

    @GetMapping("/all")
    public List<DeliveryDetailsRequest> getAllDeliveries() {
        return deliveryService.getAllDeliveryDetails();
    }


    @PutMapping("/updateStatus")
    public String updateStatus(@RequestBody DeliveryStatusUpdateRequest request) {
        return deliveryService.updateDeliveryStatus(request.getOrderId(), request.getNewStatus());
    }

    @GetMapping("/view/{orderId}")
    public List<DeliveryDetailsRequest> viewDelivery(@PathVariable String orderId) {
        List<DeliveryDetailsRequest> details = deliveryService.viewDeliveryDetails(orderId);
        if (details.isEmpty()) {
            return new ArrayList<>(); // Return an empty list if no results
        }
        return details;
    }

    @PutMapping("/update/{orderId}")
    public ResponseEntity<String> updateDeliveryStatus(
            @PathVariable String orderId,
            @RequestBody Map<String, String> request) {

        String newStatus = request.get("newStatus");
        deliveryService.updateDeliveryStatus(orderId, newStatus);
        return ResponseEntity.ok("Delivery status updated.");
    }

}
