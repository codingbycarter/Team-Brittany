package com.discovermotrails.securitybackend.controller;

import com.discovermotrails.securitybackend.model.Authority;
import com.discovermotrails.securitybackend.model.User;
import com.discovermotrails.securitybackend.repository.AuthorityRepository;
import com.discovermotrails.securitybackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
public class LoginController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    AuthorityRepository authorityRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity processRegisterUser(@RequestBody User user){
        System.out.println("\n ***USER POST request to add a user to the backend database");
        User savedUser = null;
        Set<Authority> authorities = new HashSet<>();
        ResponseEntity response = null;
        try {
            String hashPwd = passwordEncoder.encode(user.getPassword());
            user.setPwd(hashPwd);
            if (user.getRole().equals("user")) {
                authorities.add(authorityRepository.findByAuthority("USER"));
                user.setAuthorities(authorities);
            }
            if (user.getRole().equals("admin")) {
                authorities.add(authorityRepository.findByAuthority("ADMIN"));
                user.setAuthorities(authorities);
            }

            savedUser = userRepository.save(user);

            if (savedUser.getId() > 0) {
                response = ResponseEntity
                        .status(HttpStatus.CREATED)
                        .body("Given user details are successfully created");
            }
        } catch (Exception ex) {
            response = ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An exception occurred due to " + ex.getMessage());
        }
        return response;
    }

    @RequestMapping("/login")
    public String login () {
        return "I am a login page maybe?";
    }


    @RequestMapping("/user")
    public User getUserDetailsAfterLogin(Authentication authentication) {
        User loadedUser = null;
        Optional<User> optionalUser = userRepository.findByEmail(authentication.getName());
        if (optionalUser.isPresent()) {
            loadedUser = optionalUser.get();
        }
//        else {
//            //TODO: Add error handling when there is no user present.
//        }
        return loadedUser;

    }

    //TODO #1 - GetMapping for basic login page. Includes form
    //TODO #2 - PostMapping for basic login page
    //TODO #3 - GetMapping for registration page
}
