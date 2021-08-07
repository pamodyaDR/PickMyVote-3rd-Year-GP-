package com.pickMyVote.pickMyVote.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Candidate {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String position;
	private int votes;
	private Long elec_id;
	
	public Candidate() {
		
	}
	
	public Candidate(Long id, String name, String position, int votes, Long elec_id) {
		this.id = id;
		this.name = name;
		this.position = position;
		this.votes = votes;
		this.elec_id = elec_id;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public int getVotes() {
		return votes;
	}

	public void setVotes(int votes) {
		this.votes = votes;
	}

	public Long getElec_id() {
		return elec_id;
	}

	public void setElec_id(Long elec_id) {
		this.elec_id = elec_id;
	}
	
	
}
