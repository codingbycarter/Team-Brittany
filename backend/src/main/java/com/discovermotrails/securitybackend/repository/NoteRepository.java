package com.discovermotrails.securitybackend.repository;

import com.discovermotrails.securitybackend.model.Bookmark;
import com.discovermotrails.securitybackend.model.Note;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface NoteRepository extends CrudRepository<Note, Integer> {
    @Query("SELECT n from Note n where n.user.id = :id")
    List<Note> findByUserId(@Param("id") int id);

    @Query("SELECT n from Note n where n.user.id = :uid AND n.trail.id = :tid")
    List<Note> findByUserAndTrailId(@Param("uid") int uid, @Param("tid") int tid);
}
