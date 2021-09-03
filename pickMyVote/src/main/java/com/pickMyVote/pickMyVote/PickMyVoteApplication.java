package com.pickMyVote.pickMyVote;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.annotation.PostConstruct;
import java.util.TimeZone;


@SpringBootApplication
@CrossOrigin(origins = "*")
public class PickMyVoteApplication {

	public static void main(String[] args) {
		SpringApplication.run(PickMyVoteApplication.class, args);
	}


}

