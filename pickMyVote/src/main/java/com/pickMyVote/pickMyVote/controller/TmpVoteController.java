package com.pickMyVote.pickMyVote.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pickMyVote.pickMyVote.model.Candidate;
import com.pickMyVote.pickMyVote.model.Election;
import com.pickMyVote.pickMyVote.model.TmpInvisVote;
import com.pickMyVote.pickMyVote.repository.CandidateRepository;
import com.pickMyVote.pickMyVote.repository.ElectionRepository;
import com.pickMyVote.pickMyVote.repository.TmpInvisVoteRepository;


@RestController
@CrossOrigin(origins = "*")

public class TmpVoteController {
	
	
	@Autowired
	private ElectionRepository elrepo;
	
	@Autowired
	private CandidateRepository candrepo;
	
	@Autowired
	private TmpInvisVoteRepository tmpInvisRepo;

	//check access for election
    @GetMapping("/vote/{em_key}/{elec_id}")
    public String verifyVoter(@PathVariable Long elec_id,@PathVariable String em_key) {
    	TmpInvisVote grantedVoter = tmpInvisRepo.findByElecIDAndEmkey(elec_id, em_key);
    	if(grantedVoter != null) {
    		return "Access Granted";
    	}
    	else {
    		return "Access Denied";
    	}
		
    }
    
	//Get election by id
    @GetMapping("/vote/{elec_id}")
    public Optional <Election> getElections(@PathVariable Long elec_id) {
    	Optional<Election> elec = elrepo.findById(elec_id);
    	return elec;
    }
    
  //Get candidates by election id
    @GetMapping("/vote/candidates/{elec_id}")
    public List <Candidate> getCandidates(@PathVariable Long elec_id) {
    	List<Candidate> cand = candrepo.findByElecid(elec_id);
    	return cand;
    }
    
    //add vote by em key
    @PostMapping("/vote/add/{em_key}/{cand_id}")
    public void addVote(@PathVariable Long cand_id,@PathVariable String em_key) {
    	//add vote to emkey on invis_vote table
    	//add vote to candidate
    }
    
    //add voters to election 
    @PostMapping("/createVoters")
    public List<TmpInvisVote> createVoters(@RequestBody List<TmpInvisVote> voters) throws Exception{
    	List<TmpInvisVote> retVoters = null;
    	retVoters = tmpInvisRepo.saveAll(voters);
    	return retVoters;
    }
}
