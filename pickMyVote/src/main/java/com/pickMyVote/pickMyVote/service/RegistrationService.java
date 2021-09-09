package com.pickMyVote.pickMyVote.service;

import com.pickMyVote.pickMyVote.model.User;
import com.pickMyVote.pickMyVote.repository.RegistrationRepository;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.Optional;

@Service
public class RegistrationService {

    @Autowired
    private RegistrationRepository repo;       //object of the RegistrationRepository
    @Autowired
    private JavaMailSender mailSender;

    //take inputs as a User object and then save this object to the database
    public User saveUser(User user, String siteURL)
            throws MessagingException, UnsupportedEncodingException {
            String encodedPassword = user.getPassword();
            user.setPassword(encodedPassword);

            String randomCode = RandomString.make(64);
            user.setVerificationCode(randomCode);
            user.setEnabled(0);

            repo.save(user);

            sendVerificationEmail(user, siteURL);

        return repo.save(user);
    }

    private void sendVerificationEmail(User user, String siteURL)
            throws MessagingException, UnsupportedEncodingException {
                String toAddress = user.getEmail();
                String fromAddress = "pickmyvote@gmail.com";
                String senderName = "PickMyVote";
                String subject = "Please verify your registration";
                String content = "Dear [[name]],<br>"
                        + "Please click the link below to verify your registration:<br>"
                        + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
                        + "Thank you,<br>"
                        + "PickMyVote Team.";

                MimeMessage message = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message);

                helper.setFrom(fromAddress, senderName);
                helper.setTo(toAddress);
                helper.setSubject(subject);

                content = content.replace("[[name]]", user.getF_name());
                String verifyURL = siteURL + "/verify?code=" + user.getVerificationCode();

                content = content.replace("[[URL]]", verifyURL);

                helper.setText(content, true);

                mailSender.send(message);

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

    public User sendOTP(User user) throws MessagingException, UnsupportedEncodingException {
        String randomCode = RandomString.make(6);
        user.setOtpcode(randomCode);

        repo.saveOTPcode(randomCode, user.getId());
        sendUpdateVerificationEmail(user);

        return user;
    }
    
    public User updateUserFName(String email, String fname){

        User user = repo.findByEmail(email);
        user.setF_name(fname);
        user.setOtpcode(null);
        return repo.save(user);
    }

    private void sendUpdateVerificationEmail(User user)
            throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail();
        String fromAddress = "pickmyvote@gmail.com";
        String senderName = "PickMyVote";
        String subject = "Verification Code - Update Profile";
        String content = "Dear [[name]],<br>"
                + "Verification Code<br>"
                + "<h3>"+user.getOtpcode()+"</h3>"
                + "Thank you,<br>"
                + "PickMyVote Team.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getF_name());
       // String verifyURL = siteURL + "/verify?code=" + user.getVerificationCode();

       // content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);

        mailSender.send(message);

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

    public User updateUserCountry(String email, String country) {
        User user = repo.findByEmail(email);
        user.setCountry(country);
        return repo.save(user);
    }

    public User updateUserGender(String email, String gender){
        User user = repo.findByEmail(email);
        user.setGender(gender);
        return repo.save(user);
    }

    public User changeUserPassword(String email, String newpassword){
        User user = repo.findByEmail(email);
        user.setPassword(newpassword);
        user.setOtpcode(null);
        return repo.save(user);
    }

    public boolean verify(String verificationCode) {
        User user = repo.findByVerificationCode(verificationCode);
        System.out.println("hi service");
        if (user == null || user.getEnabled()==1) {
            System.out.println("service false");
            return false;
        } else {
            System.out.println("service true");
            user.setVerificationCode(null);
            user.setEnabled(1);
            repo.save(user);

            return true;
        }

    }


}
