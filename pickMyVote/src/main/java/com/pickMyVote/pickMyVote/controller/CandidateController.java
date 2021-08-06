package com.pickMyVote.pickMyVote.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pickMyVote.pickMyVote.model.Candidate;
import com.pickMyVote.pickMyVote.service.CandidateService;

@RestController
@RequestMapping("api/v1")
public class CandidateController {

	@Autowired
	private CandidateService service;
	
	//create new candidate
	@PostMapping("/createCandidate")
	public Candidate createCandidate(@RequestBody Candidate candidate) throws Exception{
		
		Candidate candidateObj = null;
		candidateObj = service.saveCandidate(candidate);
		return candidateObj;
	}
}
