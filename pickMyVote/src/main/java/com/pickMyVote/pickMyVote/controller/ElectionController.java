package com.pickMyVote.pickMyVote.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pickMyVote.pickMyVote.model.Election;
import com.pickMyVote.pickMyVote.service.ElectionService;

@RestController
@RequestMapping("/api/v1")
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
