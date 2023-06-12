package com.discovermotrails.securitybackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@Entity
public class Note extends AbstractEntity{
    @NotNull
    @ManyToOne //Each user can have many bookmarks
    private User user;

    @NotNull
    @ManyToOne //Each trail can have many bookmarks
    private Trail trail;

    @NotEmpty
    private String message;

    public Note() {}

    public Note(User user, Trail trail, String message) {
        this.user = user;
        this.trail = trail;
        this.message = message;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Trail getTrail() {
        return trail;
    }

    public void setTrail(Trail trail) {
        this.trail = trail;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}