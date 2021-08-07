package com.pickMyVote.pickMyVote.controller;

import java.io.Console;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.pickMyVote.pickMyVote.model.InvVoteKey;
import com.pickMyVote.pickMyVote.model.TmpInvisVote;
import com.pickMyVote.pickMyVote.model.User;
import com.pickMyVote.pickMyVote.repository.TmpInvisVoteRepository;
import com.pickMyVote.pickMyVote.service.BallotPaper;
import com.pickMyVote.pickMyVote.service.RegistrationService;

@RestController
@CrossOrigin(origins = "*")

public class TmpVoteController {
	
	@Autowired
	private TmpInvisVoteRepository InvVoteRepo;
	
	@Autowired
    private RegistrationService service; 

	//Get vote by id
    @GetMapping("/vote/{elec_id}/{email}")
    public Optional <BallotPaper> getInvisVote(@PathVariable Long elec_id, @PathVariable String email) {
    	User userObj = service.fetchUserByEmail(email);
    	Long user_id = userObj.getId();
    	Optional<TmpInvisVote> InvisVote = InvVoteRepo.findById(new InvVoteKey(user_id,elec_id));
    	Optional<BallotPaper> ballot = Optional.of(new BallotPaper(InvisVote,userObj));
    	//Optional<BallotPaper> opt_ballot = Optional.ofNullable(ballot);
    	return ballot;
    }
    
}
