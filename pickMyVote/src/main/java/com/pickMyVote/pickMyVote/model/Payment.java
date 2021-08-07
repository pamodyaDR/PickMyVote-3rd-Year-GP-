package com.pickMyVote.pickMyVote.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Payment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private float amount;
	private String date;
	private Long elec_id;
	
	public Payment() {
		
	}
	
	public Payment(Long id, float amount, String date, Long elec_id) {
		this.id = id;
		this.amount = amount;
		this.date = date;
		this.elec_id = elec_id;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public float getAmount() {
		return amount;
	}

	public void setAmount(float amount) {
		this.amount = amount;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public Long getElec_id() {
		return elec_id;
	}

	public void setElec_id(Long elec_id) {
		this.elec_id = elec_id;
	}
	
	
}
