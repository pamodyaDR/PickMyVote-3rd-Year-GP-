package com.pickMyVote.pickMyVote.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pickMyVote.pickMyVote.model.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

}
