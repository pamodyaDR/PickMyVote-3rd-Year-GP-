package com.pickMyVote.pickMyVote.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pickMyVote.pickMyVote.model.TmpInvisVote;

public interface TmpInvisVoteRepository extends JpaRepository<TmpInvisVote, Long> {
	
	public TmpInvisVote findByElecIDAndEmkey(Long elecID, String emkey);
	
}
