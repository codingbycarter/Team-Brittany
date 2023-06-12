package com.discovermotrails.securitybackend.controller;

import com.discovermotrails.securitybackend.model.Trail;
import com.discovermotrails.securitybackend.repository.TrailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/")
public class TrailController {
    @Autowired
    private TrailRepository trailRepository;

    @GetMapping("/trails")
    public Iterable<Trail> getAllTrails() {

        return trailRepository.findAll();
    }

    @GetMapping("/trail")
    public Trail getTrailById(@RequestParam int tid) {
        Optional<Trail> trail = trailRepository.findById(tid);
        if(trail.isEmpty()) return null;
        return trail.get();
    }

    @PostMapping("/trails")
    public Trail addTrail(@RequestBody Trail trail){
        trailRepository.save(trail); //TODO - add error checking
        return trail;
    }

    @PutMapping("/trail")
    public Trail editTrail(@RequestParam int tid, @RequestBody Trail trail) {
        trailRepository.save(trail); //TODO - add error checking
        return trail;
    }

    @DeleteMapping("/trail")
    public void deleteTrail(@RequestParam int tid) {
        Optional<Trail> trail = trailRepository.findById(tid);
        if(!trail.isEmpty())
            trailRepository.delete(trail.get()); //TODO - add error checking
    }
}
