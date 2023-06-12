package com.discovermotrails.securitybackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // prevents JSON serialization from entering infinite loop
public class User extends AbstractEntity implements UserDetails {

    private String displayName;
    private String email;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String pwd;
    private String role;

    @JsonIgnore
    @OneToMany(mappedBy = "user") // Each user can have many comments, "user" here refers to the @ManyToOne variable in the Comment class
    private final List<Comment> comments = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private final List<Note> notes = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private final List<Bookmark> bookmarks = new ArrayList<>();

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    @Override
    public String getUsername() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
//    @JsonIgnore // prevents returning the ignored properties in JSON
    public String getPassword() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

//    @JsonIgnore
    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

//    @JsonIgnore
    @OneToMany(mappedBy = "user", fetch=FetchType.EAGER)
    private Set<Authority> authorities;

    @Override
    public Set<Authority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<Authority> authorities) {
        this.authorities = authorities;
    }

//    @JsonIgnore
    public boolean isAccountLoggedIn() { return true; }

    @Override
//    @JsonIgnore
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
//    @JsonIgnore
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
//    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
//    @JsonIgnore
    public boolean isEnabled() {
        return false;
    }
}
