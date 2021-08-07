package com.pickMyVote.pickMyVote.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pickMyVote.pickMyVote.model.Payment;
import com.pickMyVote.pickMyVote.repository.PaymentRepository;

@Service
public class PaymentService {
	
	@Autowired
	private PaymentRepository payRepo;
	
	public Payment savePayment(Payment payment) {
		return payRepo.save(payment);
	}

}
