package com.pickMyVote.pickMyVote.controller;

import com.pickMyVote.pickMyVote.model.Election;
import com.pickMyVote.pickMyVote.model.OrgSubscribedUser;
import com.pickMyVote.pickMyVote.service.ElectionService;
import com.pickMyVote.pickMyVote.service.OrgSubscribedUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class OrgSubscribedUserController {

    @Autowired
    private OrgSubscribedUserService service;

    @Autowired
    private ElectionService eservice;


    @GetMapping("/userorganizations/{id}")


    public List<OrgSubscribedUser> getOrgIdList(@PathVariable Long id) throws Exception {

        List<OrgSubscribedUser> orgsList = service.fetchByUserId(id);


        return orgsList;


    }

    @GetMapping("/userelection/{id}")
    public List<Election> userelection(@PathVariable Long id) throws Exception {
        List<Election> elecList = null;
        elecList = eservice.fetchByOrgId(id);
        System.out.println("elecList");
        System.out.println(elecList);
        return elecList;
    }
}
