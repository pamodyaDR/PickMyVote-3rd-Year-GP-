package com.pickMyVote.pickMyVote.model;

import java.io.Serializable;

import javax.persistence.Embeddable;

import com.sun.istack.NotNull;


@Embeddable
public class InvVoteKey implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@NotNull
	private Long user_id;
	
	@NotNull
	private Long elec_id;

	public InvVoteKey() {
	}
	
	public InvVoteKey(Long user_id, Long elec_id) {
		this.user_id = user_id;
		this.elec_id = elec_id;
	}

	public Long getUser_id() {
		return user_id;
	}

	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}

	public Long getElec_id() {
		return elec_id;
	}

	public void setElec_id(Long elec_id) {
		this.elec_id = elec_id;
	}
	
	
	
	
}
