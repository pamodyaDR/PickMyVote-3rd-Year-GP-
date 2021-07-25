package com.pickMyVote.pickMyVote.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String f_name;
    private String l_name;
    private String email;
    private int contact_num;
    private String password;
    private String dob;
    private String roles;

    public User() {
    }

    public User(Long id, String f_name, String l_name, String email, int contact_num, String password, String dob) {
        this.id = id;
        this.f_name = f_name;
        this.l_name = l_name;
        this.email = email;
        this.contact_num = contact_num;
        this.password = password;
        this.dob = dob;
        this.roles="ROLE_USER";
    }

    public String getRoles() {
		return roles;
	}

	public void setRoles(String roles) {
		this.roles = roles;
	}

	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getF_name() {
        return f_name;
    }

    public void setF_name(String f_name) {
        this.f_name = f_name;
    }

    public String getL_name() {
        return l_name;
    }

    public void setL_name(String l_name) {
        this.l_name = l_name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getContact_num() {
        return contact_num;
    }

    public void setContact_num(int contact_num) {
        this.contact_num = contact_num;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }
}

