package com.pickMyVote.pickMyVote.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pickMyVote.pickMyVote.model.election;

public interface electionRepository extends JpaRepository<election, Long> {

}
