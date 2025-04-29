package com.example.UrbanFood.controller;

import com.example.UrbanFood.DTO.ReviewDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private MongoTemplate mongoTemplate;

    @PostMapping("/submit")
    public ResponseEntity<String> submitReview(@RequestBody List<ReviewDto> reviews) {
        for (ReviewDto review : reviews) {
            mongoTemplate.save(review, "reviews"); // saves into 'reviews' collection
        }
        return ResponseEntity.ok("Reviews submitted successfully.");
    }


}
