package com.pickMyVote.pickMyVote.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.pickMyVote.pickMyVote.model.CustomUserDetails;
import com.pickMyVote.pickMyVote.model.User;
import com.pickMyVote.pickMyVote.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional <User> user = userRepository.findByEmail(username);
		user.orElseThrow(() -> new UsernameNotFoundException("Not found: " + username));
		return user.map(CustomUserDetails::new).get();
	}
	
	
}
