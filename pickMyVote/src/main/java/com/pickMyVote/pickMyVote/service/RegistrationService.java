package com.pickMyVote.pickMyVote.service;

import com.pickMyVote.pickMyVote.model.User;
import com.pickMyVote.pickMyVote.repository.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RegistrationService {

    @Autowired
    private RegistrationRepository repo;       //object of the RegistrationRepository

    //take inputs as a User object and then save this object to the database
    public User saveUser(User user) {
        return repo.save(user);
    }

    public User fetchUserByEmail(String email){
        return repo.findByEmail(email);
    }

    public User fetchUserByEmailAndPassword(String email, String password) {
        return repo.findByEmailAndPassword(email, password);
    }

    public Optional<User> fetchUserById(Long id) {
        return repo.findById(id);
    }
    
    public User updateUserFName(String email, String fname) {
    	User user = repo.findByEmail(email);
        user.setF_name(fname);
        return repo.save(user);
    }
    
    public User updateUserLName(String email, String lname) {
    	User user = repo.findByEmail(email);
        user.setL_name(lname);
        return repo.save(user);
    }
    
    public User updateUserContact(String email, int contact) {
    	User user = repo.findByEmail(email);
        user.setContact_num(contact);
        return repo.save(user);
    }
    
    public User updateUserDOB(String email, String dob) {
    	User user = repo.findByEmail(email);
        user.setDob(dob);
        return repo.save(user);
    }
    
}
