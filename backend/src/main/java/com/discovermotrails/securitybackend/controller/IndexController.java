package com.discovermotrails.securitybackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IndexController {

    @GetMapping("/index")
    public String renderHomePage() {
        System.out.println("\n *** USER GET request for the home page");
        return "Hello World!";
    }

    //TODO: Can update this to serve some kind of dashboard functionality
    @GetMapping("/secure")
    public void renderSecureResource() {
    }

}
