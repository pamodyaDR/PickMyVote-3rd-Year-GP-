package com.pickMyVote.pickMyVote.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pickMyVote.pickMyVote.model.Election;

public interface ElectionRepository extends JpaRepository<Election, Long> {

}
