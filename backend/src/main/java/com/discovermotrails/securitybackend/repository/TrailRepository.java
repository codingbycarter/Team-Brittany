package com.discovermotrails.securitybackend.repository;

import com.discovermotrails.securitybackend.model.Trail;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrailRepository extends CrudRepository<Trail, Integer> {
}