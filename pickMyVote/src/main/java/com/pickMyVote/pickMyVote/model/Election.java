package com.pickMyVote.pickMyVote.model;



import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;

import java.sql.Time;
import java.sql.Timestamp;

@Entity
public class Election {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String title;

	private String startdatetime;

	private String enddatetime;

	private int capacity;
	private int type;
	private int sectype;
	private Long orgid;
	
	public Election() {
	}
	
	public Election(Long id, String title, String startdatetime, String enddatetime, int capacity, int type, int sectype, Long orgid) {
		this.id = id;
		this.title = title;
		this.startdatetime = startdatetime;
		this.enddatetime = enddatetime;
		this.capacity = capacity;
		this.type = type;
		this.sectype = sectype;
		this.orgid = orgid;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}



	public int getCapacity() {
		return capacity;
	}

	public void setCapacity(int capacity) {
		this.capacity = capacity;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}


	public Long getOrgid() {
		return orgid;
	}

	public void setOrgid(Long orgid) {
		this.orgid = orgid;
	}

	public int getSectype() {
		return sectype;
	}

	public void setSectype(int sectype) {
		this.sectype = sectype;
	}


	public String getEnddatetime() {
		return enddatetime;
	}

	public void setEnddatetime(String enddatetime) {
		this.enddatetime = enddatetime;
	}

	public String getStartdatetime() {
		return startdatetime;
	}

	public void setStartdatetime(String startdatetime) {
		this.startdatetime = startdatetime;
	}
}
