package com.pickMyVote.pickMyVote.service;

import com.pickMyVote.pickMyVote.model.OrgSubscribedUser;
import com.pickMyVote.pickMyVote.repository.OrgSubscribedUserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class OrgSubscribedUserService {

    @Autowired
    private OrgSubscribedUserRepository orgRepo;

    public List<OrgSubscribedUser> fetchByUserId(Long id){
        return orgRepo.findByUserid(id);
    }
}
