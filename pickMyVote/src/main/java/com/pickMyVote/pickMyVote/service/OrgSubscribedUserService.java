package com.pickMyVote.pickMyVote.service;

import com.pickMyVote.pickMyVote.model.Election;
import com.pickMyVote.pickMyVote.model.OrgSubscribedUser;
import com.pickMyVote.pickMyVote.repository.OrgSubscribedUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrgSubscribedUserService {

    @Autowired
    private OrgSubscribedUserRepository orgRepo;

    public List<OrgSubscribedUser> fetchByUserId(Long id){
        return orgRepo.findByUserid(id);
    }

    public List<Election> fetchByOrgId(Long orgid){ return orgRepo.findByOrgid(orgid); }
}
