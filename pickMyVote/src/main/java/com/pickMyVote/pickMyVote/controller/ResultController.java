package com.pickMyVote.pickMyVote.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.pickMyVote.pickMyVote.model.Candidate;
import com.pickMyVote.pickMyVote.repository.CandidateRepository;

@RestController
@CrossOrigin(origins = "*")
public class ResultController {
	
	@Autowired
	private CandidateRepository candrepo;
	
	//Get candidates by election id
	@GetMapping("/results/{elec_id}")
    public List <Candidate> getCandidates(@PathVariable Long elec_id) {
    	List<Candidate> cand = candrepo.findByElecid(elec_id);
    	return cand;
    }
	
}
