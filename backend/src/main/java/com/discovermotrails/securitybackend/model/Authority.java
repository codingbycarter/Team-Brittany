package com.discovermotrails.securitybackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;

@Entity
public class Authority extends AbstractEntity implements GrantedAuthority {

    private String authority;

    @ManyToOne
    private User user;

    public Authority(String authority, User user) {
        this.authority = authority;
        this.user = user;
    }

    public Authority() {}

    public Authority(String role) {
        this.authority = role;
    }

    @Override
    public String getAuthority() {
        return null;
    }
}
