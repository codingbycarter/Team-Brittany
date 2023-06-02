package com.discovermotrails.securitybackend.repository;

import com.discovermotrails.securitybackend.model.Authority;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface AuthorityRepository extends CrudRepository<Authority, Long> {

    Authority findByAuthority(String role);
}
