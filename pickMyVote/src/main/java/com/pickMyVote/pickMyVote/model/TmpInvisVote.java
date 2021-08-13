package com.pickMyVote.pickMyVote.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "invis_vote")
public class TmpInvisVote {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long voteID;
	private String emkey;
	private Long elecID;
	private int count;

	public TmpInvisVote() {
	}

	public TmpInvisVote(Long voteID, String emkey, Long elecID, int count) {
		this.voteID = voteID;
		this.emkey = emkey;
		this.elecID = elecID;
		this.count = count;
	}

	public Long getVoteID() {
		return voteID;
	}

	public void setVoteID(Long voteID) {
		this.voteID = voteID;
	}

	public String getEmkey() {
		return emkey;
	}

	public void setEmkey(String emkey) {
		this.emkey = emkey;
	}

	public Long getElecID() {
		return elecID;
	}

	public void setElecID(Long elecID) {
		this.elecID = elecID;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}
	

}
