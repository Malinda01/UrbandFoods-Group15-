package com.example.Delivery.Controller;

import com.example.Delivery.DTO.DpersonRequest;
import com.example.Delivery.Service.DpersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/Dpersons")

public class DpersonController {

    @Autowired
    private DpersonService dpersonService;

    //    Register - Working
    @PostMapping("/add")
    public String add_new_D_person(@RequestBody DpersonRequest dpersonRequest) {
        try {
            dpersonService.add_new_D_person(
                    dpersonRequest.getName(),
                    dpersonRequest.getEmail(),
                    dpersonRequest.getAddress(),
                    dpersonRequest.getCompany_name(),
                    dpersonRequest.getPassword()

            );
            return "Delivery person added successfully.";
        } catch (Exception e) {
            return "Error adding Delivery person: " + e.getMessage();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginD_person(@RequestParam String email, @RequestParam String password) {
        String D_Person_id = dpersonService.login_Dperson(email, password);

        if (D_Person_id != null) {
            return ResponseEntity.ok(D_Person_id);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login Failed");
        }
    }

    //Populate profile
    @GetMapping("/details/{D_Person_id}")
    public ResponseEntity<Map<String, Object>> getDpersonDetails(@PathVariable String D_Person_id) {
        try {
            Map<String, Object> DpersonDetails = dpersonService.getDpersonDetails(D_Person_id);
            return ResponseEntity.ok(DpersonDetails);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "Error fetching supplier details: " + e.getMessage()));
        }
    }


    //    Update - Working
    @PutMapping("/update/{D_Person_id}")
    public ResponseEntity<String> updateDperson(@PathVariable String D_Person_id,
                                                @RequestBody DpersonRequest dpersonRequest) {
        try {
            dpersonService.updateDperson(
                    D_Person_id,
                    dpersonRequest.getName(),
                    dpersonRequest.getEmail(),
                    dpersonRequest.getAddress(),
                    dpersonRequest.getCompany_name(),
                    dpersonRequest.getPassword()
            );

            return ResponseEntity.ok("Delivery person updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating delivery person: " + e.getMessage());
        }
    }




}

