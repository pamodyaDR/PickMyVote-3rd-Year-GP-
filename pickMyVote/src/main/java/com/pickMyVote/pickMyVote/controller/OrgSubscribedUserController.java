package com.pickMyVote.pickMyVote.controller;

import com.pickMyVote.pickMyVote.model.OrgSubscribedUser;
import com.pickMyVote.pickMyVote.service.OrgSubscribedUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public class OrgSubscribedUserController {

    @Autowired
    private OrgSubscribedUserService service;

    @GetMapping("/userorganizations/{id}")

    public List<OrgSubscribedUser> getOrgIdList(@PathVariable Long id) throws Exception {

        List<OrgSubscribedUser> orgsList = null;
        orgsList = service.fetchByUserId(id);
        return orgsList;
    }
}