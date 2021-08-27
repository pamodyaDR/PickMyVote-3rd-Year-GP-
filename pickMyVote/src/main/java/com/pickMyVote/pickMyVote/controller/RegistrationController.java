package com.pickMyVote.pickMyVote.controller;


import com.pickMyVote.pickMyVote.model.User;
import com.pickMyVote.pickMyVote.service.RegistrationService;
//import com.sun.xml.messaging.saaj.packaging.mime.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "*")
public class RegistrationController {

    @Autowired
    private RegistrationService service;        //object of the RegistrationService

    @PostMapping("/registerUser")                       //to map the below method to particular url
    public User registerUser(@RequestBody User user,  HttpServletRequest request) throws MessagingException,Exception {

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
        userObj = service.saveUser(user,  getSiteURL(request));
        return userObj;
    }

    private String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }

    @PostMapping("/getLoggedUser")
    public User getLoggedUser(@RequestBody User user) throws Exception {
        String tempEmail = user.getEmail();
        String tempPassword = user.getPassword();
        User userObject = service.fetchUserByEmail(tempEmail);
        Integer tempEnabled = userObject.getEnabled();
       // System.out.println(tempEnabled);
        User userObj = null;
        if(tempEmail != null && tempPassword != null ) {
          if(tempEnabled==0){
               throw new Exception("Please Verify your Account.Verification Link has sent to your Email");
            } else {
                userObj = service.fetchUserByEmailAndPassword(tempEmail, tempPassword);

            }

        }
       // System.out.println(tempEnabled);
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

    @GetMapping("/verify")
    public String verifyUser(@Param("code") String code) {
        System.out.println("Hi controller");
        if (service.verify(code)) {
           // System.out.println("Verification Successful.Please Login to your Account");
            return "Verification Successful.Please Login to your Account";
        } else {
           // System.out.println("Verify Fail");
            return "verification fail.Please re Register";
        }
    }

    //Get user by email
    @GetMapping("/getUserbyEmail/{email}")
    public User getUserbyEmail(@PathVariable String email) {
        User userObj = service.fetchUserByEmail(email);
        return userObj;
    }
    
}

