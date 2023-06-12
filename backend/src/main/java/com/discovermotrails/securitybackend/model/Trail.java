package com.discovermotrails.securitybackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // prevents JSON serialization from entering infinite loop
public class Trail extends AbstractEntity {

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @JsonIgnore
    @OneToMany(mappedBy = "trail") // Each post can have many comments, "trail" here refers to the @ManyToOne variable in the Comment class
    private final List<Comment> comments = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "trail") // Each post can be bookmarked by different users, "trail" here refers to the @ManyToOne variable in the Bookmark class
    private final List<Bookmark> bookmarks = new ArrayList<>();

    public Trail() {};

    public Trail(String title, String description) {
        this.title = title;
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
