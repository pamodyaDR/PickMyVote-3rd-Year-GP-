package com.pickMyVote.pickMyVote.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pickMyVote.pickMyVote.model.Organization;

public interface OrganizationRepository extends JpaRepository<Organization, Long> {

}
