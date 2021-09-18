package com.pickMyVote.pickMyVote.service;

import com.pickMyVote.pickMyVote.model.Candidate;
import com.pickMyVote.pickMyVote.model.Election;
import com.pickMyVote.pickMyVote.model.Organization;
import com.pickMyVote.pickMyVote.model.TmpInvisVote;
import com.pickMyVote.pickMyVote.model.User;
import com.pickMyVote.pickMyVote.repository.CandidateRepository;
import com.pickMyVote.pickMyVote.repository.TmpInvisVoteRepository;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.Optional;



@Service
public class VoteService {

    @Autowired
    private TmpInvisVoteRepository tmp;
    
    @Autowired
    private CandidateRepository candrep;

    @Autowired
    private JavaMailSender mailSender;

    public void sendVoterEmail(TmpInvisVote tmp, Election elec, Organization org)
            throws MessagingException, UnsupportedEncodingException {
        String toAddress = tmp.getEmkey();
        String fromAddress = "pickmyvote@gmail.com";
        String senderName = "PickMyVote";
        String subject = "Secret Code - Election";
        String content = "Dear Voter,<br>"
                + "Your have been invited for "+elec.getTitle()+" Election conducted by "+org.getName()+".<br>"
                + "Your can vote from "+elec.getStartdatetime()+" to "+elec.getEnddatetime()+".<br><br>"
                + "Your Election Id<br>"
                + "<h3>"+tmp.getElecID()+"</h3>"
                + "Your Secret Code<br>"
                + "<h3>"+tmp.getPrivateKey()+"</h3>"
                + "Thank you,<br>"
                + "PickMyVote Team.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", tmp.getEmkey());
        // String verifyURL = siteURL + "/verify?code=" + user.getVerificationCode();

        // content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);

        mailSender.send(message);

    }
    
    public void addVoteCount(String em_key,Long elecid) {
    	TmpInvisVote tmpvote = tmp.findByElecIDAndEmkey(elecid, em_key);
    	int tmpcount = tmpvote.getCount();
    	tmpcount = tmpcount+1;
    	tmpvote.setCount(tmpcount);
    	tmp.save(tmpvote);
    }
    
    public void addCandidateVote(Long cand_id) {
    	Optional<Candidate> tmpcand = candrep.findById(cand_id);
    	int votes = tmpcand.get().getVotes();
    	votes = votes+1;
    	tmpcand.get().setVotes(votes);
    	candrep.save(tmpcand.get());
    }
}
