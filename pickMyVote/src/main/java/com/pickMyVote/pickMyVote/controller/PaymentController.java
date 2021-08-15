package com.pickMyVote.pickMyVote.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pickMyVote.pickMyVote.model.Payment;
import com.pickMyVote.pickMyVote.service.PaymentService;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class PaymentController {
	
	@Autowired
	private PaymentService service;
	
	//create new election payment
	@PostMapping("/createPayment")
	public Payment createPayment(@RequestBody Payment payment) throws Exception{
		
		Payment paymentObj = null;
		paymentObj = service.savePayment(payment);
		return paymentObj;
	}

}
