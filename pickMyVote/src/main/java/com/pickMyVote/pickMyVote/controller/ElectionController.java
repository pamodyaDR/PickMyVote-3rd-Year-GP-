package com.pickMyVote.pickMyVote.controller;

import com.pickMyVote.pickMyVote.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.pickMyVote.pickMyVote.model.Election;
import com.pickMyVote.pickMyVote.service.ElectionService;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class ElectionController {
	
	@Autowired
	private ElectionService service;
	
	//create new election
	@PostMapping("/createElection")
	public Election createElection(@RequestBody Election election) throws Exception{
		
		Election electionObj = null;
		electionObj = service.saveElection(election);
		return electionObj;
	}





}
