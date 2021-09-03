package com.pickMyVote.pickMyVote.controller;

import java.util.List;
import java.util.Optional;

import com.pickMyVote.pickMyVote.model.Election;
import com.pickMyVote.pickMyVote.repository.OrganizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pickMyVote.pickMyVote.model.Organization;
import com.pickMyVote.pickMyVote.service.OrganizationService;

@RestController
@RequestMapping("api/v1")
@CrossOrigin(origins = "*")
public class OrganizationController {

	@Autowired
	private OrganizationService service;

	@Autowired
	private OrganizationRepository orgrepo;

	//create new organization
	@PostMapping("/createOrganization")
	public Organization createOrganization(@RequestBody Organization organizaiton) throws Exception {

		Organization organizationObj = null;
		organizationObj = service.saveOrganization(organizaiton);
		return organizationObj;
	}

	//get organizaions list of owner
	@GetMapping("/getOrgsOfOwner/{ownerID}")
	public List<Organization> getOrgsOfOwner(@PathVariable Long ownerID) throws Exception {

		List<Organization> orgsList = null;
		orgsList = service.OrgsOfOwner(ownerID);
		return orgsList;

	}

	@GetMapping("/getOrganizationName/{id}")
	public Optional<Organization> getOrganizationName(@PathVariable Long id) {
		Optional<Organization> orgObj = orgrepo.findById(id);
		return orgObj;

	}
}
