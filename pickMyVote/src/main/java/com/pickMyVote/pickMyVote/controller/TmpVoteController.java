package com.pickMyVote.pickMyVote.controller;

import java.util.List;
import java.util.Optional;

import com.pickMyVote.pickMyVote.model.*;
import com.pickMyVote.pickMyVote.repository.OrganizationRepository;
import com.pickMyVote.pickMyVote.service.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pickMyVote.pickMyVote.repository.CandidateRepository;
import com.pickMyVote.pickMyVote.repository.ElectionRepository;
import com.pickMyVote.pickMyVote.repository.TmpInvisVoteRepository;

import javax.mail.MessagingException;
import java.util.*;


@RestController
@CrossOrigin(origins = "*")

public class TmpVoteController {
	
	
	@Autowired
	private ElectionRepository elrepo;
	
	@Autowired
	private CandidateRepository candrepo;
	
	@Autowired
	private TmpInvisVoteRepository tmpInvisRepo;

	@Autowired
	private VoteService service;

	@Autowired
	private OrganizationRepository orgrepo;



	//check access for election
    @GetMapping("/vote/{em_key}/{elec_id}")
	public boolean verifyVoter(@PathVariable String em_key, @PathVariable Long elec_id) {
    	TmpInvisVote grantedVoter = tmpInvisRepo.findByElecIDAndEmkey(elec_id, em_key);
    	if(grantedVoter != null) {
    		if(grantedVoter.getCount()<1)
    			return true;
    		else
    			return false;
    	}
    	else {
			return false;
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

	//Get elections by email
	@GetMapping("/vote/getelections/{email}")
	public List <TmpInvisVote> getInvisvote(@PathVariable String email) {
		List<TmpInvisVote> elec = tmpInvisRepo.findByEmkey(email);
		return elec;
	}
    
    //add vote by em key
    @GetMapping("/vote/add/{em_key}/{elec_id}/{cand_id}")
    public boolean addVote(@PathVariable String em_key, @PathVariable Long elec_id, @PathVariable Long cand_id) {
    	//add vote to emkey on invis_vote table
    	service.addVoteCount(em_key, elec_id);
    	//add vote to candidate
    	service.addCandidateVote(cand_id);
    	return true;
    }
    
    //add voters to election 
    @PostMapping("/createVoters")
    public List<TmpInvisVote> createVoters(@RequestBody List<TmpInvisVote> voters) throws Exception{
    	int i;
    	List<TmpInvisVote> retVoters = null;
    	retVoters = tmpInvisRepo.saveAll(voters);


    	for(i=0;i< retVoters.size();i++) {
			Optional<Election> elecObj = elrepo.findById(retVoters.get(i).getElecID());
			Optional<Organization> orgObj = orgrepo.findById(elecObj.get().getOrgid());
			//retVoters.get(i).getPrivateKey();
			service.sendVoterEmail(retVoters.get(i),elecObj.get(),orgObj.get());
		}
    	return retVoters;
    }

  //Get voters by election ID
  	@GetMapping("/vote/getvoters/{elecid}")
  	public List <TmpInvisVote> getInvitedVoters(@PathVariable Long elecid) {
  		List<TmpInvisVote> voters = tmpInvisRepo.findByElecID(elecid);
  		return voters;
  	}


}
