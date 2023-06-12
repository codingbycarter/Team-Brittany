package com.discovermotrails.securitybackend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;

@Entity
public class Bookmark extends AbstractEntity {

    @NotNull
    @ManyToOne //Each user can have many bookmarks
    private User user;

    @NotNull
    @ManyToOne //Each trail can have many bookmarks
    private Trail trail;

    public Bookmark() {}

    public Bookmark(User user, Trail trail) {
        this.user = user;
        this.trail = trail;
    }

    public User getUser() {
        return user;
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
}