package com.discovermotrails.securitybackend.controller;

import com.discovermotrails.securitybackend.model.Bookmark;
import com.discovermotrails.securitybackend.model.Trail;
import com.discovermotrails.securitybackend.model.User;
import com.discovermotrails.securitybackend.model.dto.BookmarkFormDTO;
import com.discovermotrails.securitybackend.repository.BookmarkRepository;
import com.discovermotrails.securitybackend.repository.TrailRepository;
import com.discovermotrails.securitybackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/")
public class BookmarkController {
    @Autowired
    private BookmarkRepository bookmarkRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TrailRepository trailRepository;

    // example: to access bookmarks of user with id 2, use the url http://localhost:8080/api/mybookmarks?uid=2
    @GetMapping("/mybookmarks")
    public Iterable<Bookmark> getUserBookmarks(@RequestParam Integer uid) {

        return bookmarkRepository.findByUserId(uid);
    }

    // for testing only, not used in the actual app
    @GetMapping("/bookmarks")
    public Iterable<Bookmark> getAllBookmarks() {

        return bookmarkRepository.findAll();
    }

    @GetMapping("trailbookmark")
    public Iterable<Bookmark> getBookmarkByUserAndTrailId(@RequestParam int uid, @RequestParam int tid) {
        return bookmarkRepository.findByUserAndTrailId(uid, tid);
    }

    @PostMapping("/mybookmarks")
    public Bookmark addBookmark(@RequestBody BookmarkFormDTO bmfDTO){

        Optional<User> userOpt = userRepository.findById(bmfDTO.getUid());
        User user;
        if(userOpt.isEmpty()) return null;
        else user = userOpt.get();

        Trail trail;
        Optional<Trail> trailOpt = trailRepository.findById(bmfDTO.getTid());
        if(trailOpt.isEmpty()) return null;
        else trail = trailOpt.get();

        Bookmark bookmark = new Bookmark(user, trail);

        bookmarkRepository.save(bookmark); //TODO - add error checking
        return bookmark;
    }

    @DeleteMapping("/bookmark")
    public void deleteBookmark(@RequestParam int bid) {
        Optional<Bookmark> bookmark = bookmarkRepository.findById(bid);
        if(!bookmark.isEmpty())
            bookmarkRepository.delete(bookmark.get());
    }
}
