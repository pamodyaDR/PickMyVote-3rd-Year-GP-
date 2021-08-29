package com.pickMyVote.pickMyVote.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

@Entity

public class OrgSubscribedUser {
    @Id
    private Long uorgid;
    private Long orgid;

    private Long userid;
    private String role;


    public Long getOrgid() {
        return orgid;
    }

    public void setOrgid(Long orgid) {
        this.orgid = orgid;
    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getUorgid() {
        return uorgid;
    }

    public void setUorgid(Long uorgid) {
        this.uorgid = uorgid;
    }
}
