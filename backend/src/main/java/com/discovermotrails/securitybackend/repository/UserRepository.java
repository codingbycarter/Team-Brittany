package com.discovermotrails.securitybackend.repository;

import com.discovermotrails.securitybackend.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    //This says to find the details by a select query for email
    Optional<User> findByEmail(String email);
}
