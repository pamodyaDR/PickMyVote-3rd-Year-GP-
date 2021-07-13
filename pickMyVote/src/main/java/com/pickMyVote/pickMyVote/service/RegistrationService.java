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
}
