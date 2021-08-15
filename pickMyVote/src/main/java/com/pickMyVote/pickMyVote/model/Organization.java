package com.pickMyVote.pickMyVote.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Organization {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String type;
	private String notices;
	private Long ownerID;
	
	public Organization() {
		
	}
	
	public Organization(Long id, String name, String type, String notices, Long ownerID) {
		this.id = id;
		this.name = name;
		this.type = type;
		this.notices = notices;
		this.ownerID = ownerID;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getNotices() {
		return notices;
	}

	public void setNotices(String notices) {
		this.notices = notices;
	}

	public Long getOwnerID() {
		return ownerID;
	}

	public void setOwnerID(Long ownerID) {
		this.ownerID = ownerID;
	}

}
