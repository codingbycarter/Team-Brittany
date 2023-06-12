package com.discovermotrails.securitybackend.repository;

import com.discovermotrails.securitybackend.model.Bookmark;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookmarkRepository extends CrudRepository<Bookmark, Integer> {

    @Query("SELECT bm from Bookmark bm where bm.user.id = :id")
    List<Bookmark> findByUserId(@Param("id") int id);

    @Query("SELECT bm from Bookmark bm where bm.user.id = :uid AND bm.trail.id = :tid")
    List<Bookmark> findByUserAndTrailId(@Param("uid") int uid, @Param("tid") int tid);
}
