package com.discovermotrails.securitybackend.model;


import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
public class Comment extends AbstractEntity{
    @ManyToOne // Many comments may be owned by a user
    private User user; // represents the user_id field in the database

    @NotNull
    @ManyToOne // Many comments may be owned by a post
    private Trail trail; //specifies the trail post the comment is associated with

    @NotBlank
    private String message;

    public Comment() {}

    public Comment(User user, Trail trail, String message) {
        this.user = user;
        this.trail = trail;
        this.message = message;
    }

    public User getUser() {
        return user;
    }

    public String getMessage() {
        return message;
    }

    public Trail getTrail() {
        return trail;
    }


    public void setUser(User user) {
        this.user = user;
    }

    public void setTrail(Trail trail) {
        this.trail = trail;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "Comment{" +
                "user=" + user +
                ", trail=" + trail +
                ", message='" + message + '\'' +
                '}';
    }
}