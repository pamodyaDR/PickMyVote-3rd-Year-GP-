package com.pickMyVote.pickMyVote.model;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "invis_vote")
public class TmpInvisVote {
	
	@EmbeddedId
	private InvVoteKey InvVoteID;
	
	private int vote_count;

	public TmpInvisVote() {
	}

	public TmpInvisVote(InvVoteKey invVoteID, int vote_count) {
		InvVoteID = invVoteID;
		this.vote_count = vote_count;
	}

	public InvVoteKey getInvVoteID() {
		return InvVoteID;
	}

	public void setInvVoteID(InvVoteKey invVoteID) {
		InvVoteID = invVoteID;
	}

	public int getVote_count() {
		return vote_count;
	}

	public void setVote_count(int vote_count) {
		this.vote_count = vote_count;
	}
	

}
