package com.pickMyVote.pickMyVote.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pickMyVote.pickMyVote.model.Organization;
import com.pickMyVote.pickMyVote.service.OrganizationService;

@RestController
@RequestMapping("api/v1")
public class OrganizationController {
	
	@Autowired
	private OrganizationService service;
	
	//create new organization
	@PostMapping("/createOrganization")
	public Organization createOrganization(@RequestBody Organization organizaiton) throws Exception{
		
		Organization organizationObj = null;
		organizationObj = service.saveOrganization(organizaiton);
		return organizationObj;
	}

}
