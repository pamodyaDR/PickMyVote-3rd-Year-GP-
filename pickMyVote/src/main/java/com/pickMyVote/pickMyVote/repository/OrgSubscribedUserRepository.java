package com.pickMyVote.pickMyVote.repository;

import com.pickMyVote.pickMyVote.model.Election;
import com.pickMyVote.pickMyVote.model.OrgSubscribedUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrgSubscribedUserRepository extends JpaRepository<OrgSubscribedUser,Long>{
    public List<OrgSubscribedUser> findByUserid(Long id);
    public List<Election> findByOrgid(Long orgid);
}





