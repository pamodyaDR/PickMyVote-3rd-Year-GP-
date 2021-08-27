package com.pickMyVote.pickMyVote.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pickMyVote.pickMyVote.model.Organization;
import com.pickMyVote.pickMyVote.repository.OrganizationRepository;

@Service
public class OrganizationService {
	
	@Autowired
	private OrganizationRepository orgRepo;
	
	public Organization saveOrganization(Organization organization) {
		return orgRepo.save(organization);
	}
	
	public List<Organization> OrgsOfOwner(Long ownerID) {
		return orgRepo.findByOwnerID(ownerID);
	}



}
