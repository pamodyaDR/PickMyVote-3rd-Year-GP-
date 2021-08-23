package com.pickMyVote.pickMyVote.repository;

import com.pickMyVote.pickMyVote.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface RegistrationRepository extends JpaRepository<User, Long> {
    public User findByEmail(String email);      //just declare in interface
    public User findByEmailAndPassword(String email, String password);
    public Optional<User> findById(Long id);
    @Query("SELECT u FROM User u WHERE u.verificationCode = ?1")
    public User findByVerificationCode(String code);
   // System.out.println("service false");
}