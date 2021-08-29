package com.pickMyVote.pickMyVote.repository;

import com.pickMyVote.pickMyVote.model.OrgSubscribedUser;
import org.springframework.data.jpa.repository.JpaRepository;

import com.pickMyVote.pickMyVote.model.Election;

import java.util.List;

public interface ElectionRepository extends JpaRepository<Election, Long> {

    public List<Election> findByOrgid(Long id);

}


