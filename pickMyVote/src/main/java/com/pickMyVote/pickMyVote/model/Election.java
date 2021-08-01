package com.pickMyVote.pickMyVote.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Election {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String title;
	private String start_date_time;
	private String end_date_time;
	private int capacity;
	private int type;
	private int sec_type;
	private Long org_id;
	
	public Election() {
	}
	
	public Election(Long id, String title, String start_date_time, String end_date_time, int capacity, int type, int sec_type, Long org_id) {
		this.id = id;
		this.title = title;
		this.start_date_time = start_date_time;
		this.end_date_time = end_date_time;
		this.capacity = capacity;
		this.type = type;
		this.sec_type = sec_type;
		this.org_id = org_id;
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

	public String getStart_date_time() {
		return start_date_time;
	}

	public void setStart_date_time(String start_date_time) {
		this.start_date_time = start_date_time;
	}

	public String getEnd_date_time() {
		return end_date_time;
	}

	public void setEnd_date_time(String end_date_time) {
		this.end_date_time = end_date_time;
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

	public int getSec_type() {
		return sec_type;
	}

	public void setSec_type(int sec_type) {
		this.sec_type = sec_type;
	}

	public Long getOrg_id() {
		return org_id;
	}

	public void setOrg_id(Long org_id) {
		this.org_id = org_id;
	}	
}
