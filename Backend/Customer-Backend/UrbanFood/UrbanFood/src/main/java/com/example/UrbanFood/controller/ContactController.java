package com.example.UrbanFood.controller;


import com.example.UrbanFood.DTO.ContactMessageRequest;
import com.example.UrbanFood.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @PostMapping
    public String submitContactMessage(@RequestBody ContactMessageRequest request) {
        contactService.saveContactMessage(request);
        return "Message received successfully!";
    }
}