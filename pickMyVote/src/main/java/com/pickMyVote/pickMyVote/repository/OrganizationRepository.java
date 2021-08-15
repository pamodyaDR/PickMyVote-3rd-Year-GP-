package com.pickMyVote.pickMyVote.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pickMyVote.pickMyVote.model.Organization;

public interface OrganizationRepository extends JpaRepository<Organization, Long> {

	public List<Organization> findByOwnerID(Long ownerID);
}
