package com.pickMyVote.pickMyVote.model;

import org.hibernate.annotations.Type;

import javax.persistence.*;

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
    private String country;
    private String gender;
    private String q1;
    private String q2;
    private String a1;
    private String a2;
    @Column(name = "verification_code", length = 64)
    private String verificationCode;

    private String otpcode;

//    @Column(nullable = false)
//    @Type(type = "org.hibernate.type.NumericBooleanType")
    private Integer enabled;

    public User() {
    }

    public User(Long id, String f_name, String l_name, String email, int contact_num, String password, String dob, String roles, String country, String gender, String q1, String q2, String a1, String a2,String verificationCode, String otpcode) {
        this.id = id;
        this.f_name = f_name;
        this.l_name = l_name;
        this.email = email;
        this.contact_num = contact_num;
        this.password = password;
        this.dob = dob;
        this.roles= roles;
        this.country = country;
        this.gender = gender;
        this.q1 = q1;
        this.q2 = q2;
        this.a1 = a1;
        this.a2 = a2;
        this.verificationCode = verificationCode;
        this.otpcode = otpcode;
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

    public String getCountry() { return country; }

    public void setCountry(String country) { this.country = country; }

    public String getGender() { return gender; }

    public void setGender(String gender) { this.gender = gender; }

    public String getQ1() { return q1; }

    public void setQ1(String q1) { this.q1 = q1; }

    public String getQ2() { return q2; }

    public void setQ2(String q2) { this.q2 = q2; }

    public String getA1() { return a1; }

    public void setA1(String a1) { this.a1 = a1; }

    public String getA2() { return a2; }

    public void setA2(String a2) { this.a2 = a2; }

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }


    public Integer getEnabled() {
        return enabled;
    }

    public void setEnabled(Integer enabled) {
        this.enabled = enabled;
    }

    public String getOtpcode() {
        return otpcode;
    }

    public void setOtpcode(String otpcode) {
        this.otpcode = otpcode;
    }
}

