package com.discovermotrails.securitybackend.controller;

import com.discovermotrails.securitybackend.model.Trail;
import com.discovermotrails.securitybackend.model.User;
import com.discovermotrails.securitybackend.model.dto.CommentFormDTO;
import com.discovermotrails.securitybackend.repository.CommentRepository;
import com.discovermotrails.securitybackend.model.Comment;
import com.discovermotrails.securitybackend.repository.TrailRepository;
import com.discovermotrails.securitybackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/")
public class CommentController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TrailRepository trailRepository;

    @Autowired
    private CommentRepository commentRepository;

    // for testing only
    @GetMapping("/allcomments")
    public Iterable<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    @GetMapping("/mycomments")
    public Iterable<Comment> getUserComments(@RequestParam Integer uid) {

        return commentRepository.findByUserId(uid);
    }

    @GetMapping("/comment")
    public Comment getCommentById(@RequestParam int cid) {
        Optional<Comment> comment = commentRepository.findById(cid);
        if(comment.isEmpty()) return null;
        return comment.get();
    }

    @GetMapping("/comments")
    public Iterable<Comment> getCommentsByTrail(@RequestParam int tid) {

        return commentRepository.findByTrailId(tid);
    }

    @PostMapping("/comments")
    public Comment addComment(@RequestBody CommentFormDTO cfDTO){

        Optional<User> userOpt = userRepository.findById(cfDTO.getUid());
        User user;
        if(userOpt.isEmpty()) return null;
        else user = userOpt.get();

        Trail trail;
        Optional<Trail> trailOpt = trailRepository.findById(cfDTO.getTid());
        if(trailOpt.isEmpty()) return null;
        else trail = trailOpt.get();

        Comment comment = new Comment(user, trail, cfDTO.getMessage());

        commentRepository.save(comment); //TODO - add error checking
        return comment;
    }

    @PutMapping("/comment")
    public Comment editNoteTrail(@RequestParam int cid, @RequestBody Comment comment) {
        commentRepository.save(comment); //TODO - add error checking
        return comment;
    }

    @DeleteMapping("/comment")
    public void deleteBookmark(@RequestParam int cid) {
        Optional<Comment> comment = commentRepository.findById(cid);
        if(!comment.isEmpty())
            commentRepository.delete(comment.get());
    }
}
