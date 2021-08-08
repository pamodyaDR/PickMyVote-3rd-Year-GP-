package com.pickMyVote.pickMyVote.controller;


import com.pickMyVote.pickMyVote.model.User;
import com.pickMyVote.pickMyVote.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "*")
public class RegistrationController {

    @Autowired
    private RegistrationService service;        //object of the RegistrationService

    @PostMapping("/registerUser")                       //to map the below method to particulier url
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

    @PostMapping("/getLoggedUser")
    public User getLoggedUser(@RequestBody User user) throws Exception {
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
    
    @GetMapping("/greetings")
    public String hello() {
    	return "Hello user";
    }
    
    //Update user details
    
    @PostMapping("/updateUser")
    public User updateUser(@RequestBody User user) throws Exception {
    	User userObj = null;
        userObj = service.updateUserFName(user.getEmail(),user.getF_name());
        userObj = service.updateUserLName(user.getEmail(),user.getL_name());
        userObj = service.updateUserContact(user.getEmail(),user.getContact_num());
        userObj = service.updateUserDOB(user.getEmail(),user.getDob());
        return userObj;
    }
    
}

