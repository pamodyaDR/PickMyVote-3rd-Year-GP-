package com.pickMyVote.pickMyVote.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pickMyVote.pickMyVote.model.Candidate;
import com.pickMyVote.pickMyVote.repository.CandidateRepository;

@Service
public class CandidateService {
	
	@Autowired
	private CandidateRepository candiRepo;
	
	public List<Candidate> saveCandidate(List<Candidate> candidate) {
		return candiRepo.saveAll(candidate);
	}

}
