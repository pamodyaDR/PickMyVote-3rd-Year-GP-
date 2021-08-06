package com.pickMyVote.pickMyVote.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pickMyVote.pickMyVote.model.Candidate;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {

}
