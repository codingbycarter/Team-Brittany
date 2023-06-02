package com.discovermotrails.securitybackend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountController {

    @GetMapping("/account")
    public ResponseEntity<?> renderAccountPage() {
        System.out.println("\n*** USER GET request for account details");
        return ResponseEntity.ok("Here are the details from the DB");
    }
}
