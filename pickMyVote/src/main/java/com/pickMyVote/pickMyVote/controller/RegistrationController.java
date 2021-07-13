package com.pickMyVote.pickMyVote.controller;


import com.pickMyVote.pickMyVote.model.User;
import com.pickMyVote.pickMyVote.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Optional;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@RestController
public class RegistrationController {

    //cors error handling
    @Component
    public class SimpleCORSFilter implements Filter {

        private final Logger log = LoggerFactory.getLogger(SimpleCORSFilter.class);

        public SimpleCORSFilter() {
            log.info("SimpleCORSFilter init");
        }

        @Override
        public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {

            HttpServletRequest request = (HttpServletRequest) req;
            HttpServletResponse response = (HttpServletResponse) res;

            response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
            response.setHeader("Access-Control-Allow-Credentials", "true");
            response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
            response.setHeader("Access-Control-Max-Age", "3600");
            response.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");

            chain.doFilter(req, res);
        }

        @Override
        public void init(FilterConfig filterConfig) {
        }

        @Override
        public void destroy() {
        }

    }

    @Autowired
    private RegistrationService service;        //object of the RegistrationService

    @PostMapping("/registerUser")                       //to map the below method to particulier url
    @CrossOrigin(origins = "http://localhost:4200")
    public User registerUser(@RequestBody User user) throws Exception {

        String tempEmail = user.getEmail();

        if(tempEmail != null && !"".equals(tempEmail)){
            if(tempEmail != null && !"".equals(tempEmail)) {
                User userObject = service.fetchUserByEmail(tempEmail);
                if(userObject != null) {
                    throw new Exception("User with "+tempEmail+" is already exist");
                }
            }
        }

        User userObj = null;
        userObj = service.saveUser(user);
        return userObj;
    }

    @PostMapping("/login")
    @CrossOrigin(origins = "http://localhost:4200")
    public User login(@RequestBody User user) throws Exception {
        String tempEmail = user.getEmail();
        String tempPassword = user.getPassword();
        User userObj = null;
        if(tempEmail != null && tempPassword != null) {
            userObj = service.fetchUserByEmailAndPassword(tempEmail, tempPassword);
        }
        if(userObj == null) {
            throw new Exception("User does mot exist");
        }
        return userObj;
    }

    //Get user by id
    @GetMapping("/getUser/{id}")
    public Optional<User> getUser(@PathVariable Long id) {
        Optional<User> userObj = service.fetchUserById(id);
        return userObj;

    }
}

