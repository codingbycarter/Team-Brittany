package com.discovermotrails.securitybackend;

import com.discovermotrails.securitybackend.model.*;
import com.discovermotrails.securitybackend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Arrays;
import java.util.Optional;

@SpringBootApplication
public class SecuritybackendApplication
		implements CommandLineRunner { //TODO - for testing only, delete before pushing

	public static void main(String[] args) {
		SpringApplication.run(SecuritybackendApplication.class, args);
	}


	@Autowired
	private TrailRepository trailRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private NoteRepository noteRepository;

	@Autowired
	private CommentRepository commentRepository;

	@Autowired
	private BookmarkRepository bookmarkRepository;

//	TODO - for local development only, delete before pushing
//	Generating testing data
	@Override
	public void run(String... args) throws Exception {

// TODO - create users with corresponding email shown below before uncomment the code to generate some test data
//		Optional<User> opt1 = userRepository.findByEmail("user@email.com");
//		User user1 = opt1.get(); //assuming not empty
//
//		Optional<User> opt2 = userRepository.findByEmail("user1@email.com");
//		User user2 = opt2.get(); //assuming not empty
//
//		Trail trail1 = new Trail("Yellowstone", "YSNP");
//		Trail trail2 = new Trail("White Sand", "WSNP");
//		Trail trail3 = new Trail("Acadia", "ACNP");
//
//		Bookmark bm1 = new Bookmark(user1, trail1);
//		Bookmark bm2 = new Bookmark(user2, trail1);
//		Bookmark bm3 = new Bookmark(user2, trail2);
//
//		Note note1 = new Note(user1, trail1, "note1");
//		Note note2 = new Note(user2, trail1, "user 2 note");
//
//		Comment cm1 = new Comment(user2, trail1, "first comment");
//		Comment cm2 = new Comment(user2, trail2, "white sand");
//
//		trailRepository.saveAll(Arrays.asList(trail1, trail2, trail3)); //already in the db
//
//		bookmarkRepository.saveAll(Arrays.asList(bm1, bm2, bm3));
//		noteRepository.saveAll(Arrays.asList(note1, note2));
//		commentRepository.saveAll(Arrays.asList(cm1, cm2));
	}
}
