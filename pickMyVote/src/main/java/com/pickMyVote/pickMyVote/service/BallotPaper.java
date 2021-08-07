package com.pickMyVote.pickMyVote.service;

import java.io.Serializable;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.pickMyVote.pickMyVote.model.TmpInvisVote;
import com.pickMyVote.pickMyVote.model.User;
import com.pickMyVote.pickMyVote.repository.TmpInvisVoteRepository;

public class BallotPaper implements Serializable {
	
	@Autowired
	private TmpInvisVoteRepository InvVoteRepo;
	
	private Optional <TmpInvisVote> invis_vote;
	private User user;
	
	public BallotPaper() {
	}
	
	public BallotPaper(Optional <TmpInvisVote> invis_vote, User user) {
		this.invis_vote = invis_vote;
		this.user = user;
	}


}
