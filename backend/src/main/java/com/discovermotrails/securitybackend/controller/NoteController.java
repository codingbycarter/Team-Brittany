package com.discovermotrails.securitybackend.controller;

import com.discovermotrails.securitybackend.model.*;
import com.discovermotrails.securitybackend.model.dto.NoteFormDTO;
import com.discovermotrails.securitybackend.repository.NoteRepository;
import com.discovermotrails.securitybackend.repository.TrailRepository;
import com.discovermotrails.securitybackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/")
public class NoteController {
    @Autowired
    NoteRepository noteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TrailRepository trailRepository;

    // for testing only, not used in the actual app
    @GetMapping("/allnotes")
    public Iterable<Note> getNotes() {
        return noteRepository.findAll();
    }

    // example: to access notes of user with id 2, use the url http://localhost:8080/api/mynotes?uid=2
    @GetMapping("/mynotes")
    public Iterable<Note> getUserBookmarks(@RequestParam Integer uid) {

        return noteRepository.findByUserId(uid);
    }

    @GetMapping("/note")
    public Note getNoteById(@RequestParam int nid) {
        Optional<Note> note = noteRepository.findById(nid);
        if(note.isEmpty()) return null;
        return note.get();
    }

    @GetMapping("/trailnote")
    public Iterable<Note> getNoteByUserAndTrailId(@RequestParam int uid, @RequestParam int tid) {
        return noteRepository.findByUserAndTrailId(uid, tid);
    }

    @PostMapping("/mynotes")
    public Note addNote(@RequestBody NoteFormDTO nfDTO){

        System.out.println("-------------------------------");
        System.out.println("uid: " + nfDTO.getUid());
        System.out.println("tid: " + nfDTO.getTid());
        System.out.println("msg: " + nfDTO.getMessage());
        System.out.println("-------------------------------");

        Optional<User> userOpt = userRepository.findById(nfDTO.getUid());
        User user;
        if(userOpt.isEmpty()) return null;
        else user = userOpt.get();

        Trail trail;
        Optional<Trail> trailOpt = trailRepository.findById(nfDTO.getTid());
        if(trailOpt.isEmpty()) return null;
        else trail = trailOpt.get();

        Note note = new Note(user, trail, nfDTO.getMessage());

        noteRepository.save(note); //TODO - add error checking
        return note;
    }

    @PutMapping("/note")
    public Note editNoteTrail(@RequestParam int nid, @RequestBody Note note) {
        noteRepository.save(note); //TODO - add error checking
        return note;
    }

    @DeleteMapping("/note")
    public void deleteBookmark(@RequestParam int nid) {
        Optional<Note> note = noteRepository.findById(nid);
        if(!note.isEmpty())
            noteRepository.delete(note.get());
    }
}