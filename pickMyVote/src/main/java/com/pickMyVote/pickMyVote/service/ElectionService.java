package com.pickMyVote.pickMyVote.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pickMyVote.pickMyVote.model.Election;
import com.pickMyVote.pickMyVote.repository.ElectionRepository;

@Service
public class ElectionService {
	
	@Autowired
	private ElectionRepository eleRepo;
	
	public Election saveElection(Election election) {
		return eleRepo.save(election);
	}
}
