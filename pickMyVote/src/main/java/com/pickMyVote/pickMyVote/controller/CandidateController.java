package com.pickMyVote.pickMyVote.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pickMyVote.pickMyVote.model.Candidate;
import com.pickMyVote.pickMyVote.service.CandidateService;

@RestController
@RequestMapping("api/v1")
@CrossOrigin(origins = "*")
public class CandidateController {

	@Autowired
	private CandidateService service;
	
	//create new candidate
	@PostMapping("/createCandidate")
	public List<Candidate> createCandidate(@RequestBody List<Candidate> candidate) throws Exception{
		
		List<Candidate> candidateObj = null;
		candidateObj = service.saveCandidate(candidate);
		return candidateObj;
	}
}
