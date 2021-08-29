package com.pickMyVote.pickMyVote.service;

import com.pickMyVote.pickMyVote.model.OrgSubscribedUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pickMyVote.pickMyVote.model.Election;
import com.pickMyVote.pickMyVote.repository.ElectionRepository;

import java.util.List;

@Service
public class ElectionService {
	
	@Autowired
	private ElectionRepository eleRepo;
	
	public Election saveElection(Election election) {
		return eleRepo.save(election);
	}

	public List<Election> fetchByOrgId(Long id){
		return eleRepo.findByOrgid(id);
	}
}
