package com.pickMyVote.pickMyVote.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pickMyVote.pickMyVote.model.TmpInvisVote;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

public interface TmpInvisVoteRepository extends JpaRepository<TmpInvisVote, Long> {
	
	public TmpInvisVote findByElecIDAndEmkey(Long elecID, String emkey);

}


