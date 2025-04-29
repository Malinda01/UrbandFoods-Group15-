package com.example.UrbanFood.service;


import com.example.UrbanFood.DTO.ContactMessageRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    @Autowired
    private MongoTemplate mongoTemplate;

    public void saveContactMessage(ContactMessageRequest request) {
        mongoTemplate.save(request, "contact_messages"); // Saves to 'contact_messages' collection
    }
}
