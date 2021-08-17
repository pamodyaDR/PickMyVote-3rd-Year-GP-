package com.pickMyVote.pickMyVote.controller;

import java.util.List;
import java.util.Optional;

import com.pickMyVote.pickMyVote.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.pickMyVote.pickMyVote.model.Election;
import com.pickMyVote.pickMyVote.model.Organization;
import com.pickMyVote.pickMyVote.model.Payment;
import com.pickMyVote.pickMyVote.repository.ElectionRepository;
import com.pickMyVote.pickMyVote.repository.OrganizationRepository;
import com.pickMyVote.pickMyVote.repository.PaymentRepository;

@RestController
@CrossOrigin(origins = "*")
public class AdminController {
	
	@Autowired
	private ElectionRepository elrepo;
	
	@Autowired
	private PaymentRepository payrepo;
	
	@Autowired
	private OrganizationRepository orgrepo;

	 //Get all elections
    @GetMapping("/getElections")
    public List<Election> getElections() {
        List<Election> elObj = elrepo.findAll();
        return elObj;

    }
    
  //Get all payments
    @GetMapping("/getPayments")
    public List<Payment> getPayments() {
        List<Payment> payObj = payrepo.findAll();
        return payObj;

    }
    
  //Get all organizations
    @GetMapping("/getOrganizations")
    public List<Organization> getOrganizations() {
        List<Organization> orgObj = orgrepo.findAll();
        return orgObj;

    }

    //Get organizationName by id
    @GetMapping("/getOrganizationName/{id}")
    public Optional<Organization> getOrganizationName(@PathVariable Long id) {
        Optional<Organization> orgObj = orgrepo.findById(id);
        return orgObj;

    }
    
}
