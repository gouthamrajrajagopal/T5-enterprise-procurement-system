package com.t5.enterpriseprocurement.service.impl;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import com.t5.enterpriseprocurement.entity.User;
import com.t5.enterpriseprocurement.entity.PurchaseRequest;
import com.t5.enterpriseprocurement.service.EmailService;

@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendEmail(
            String to,
            String subject,
            String body) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
    }
    
    @Override
    public void sendRegistrationEmail(User user) {

        sendEmail(
                user.getEmail(),
                "Registration Successful",
                "Welcome " + user.getName()
                        + "!\n\n"
                        + "Your account has been created successfully in the Enterprise Procurement System.");

    }
    
    @Override
    public void sendPurchaseSubmissionEmail(
            User user,
            PurchaseRequest purchaseRequest) {

        sendEmail(
                user.getEmail(),
                "Purchase Request Submitted",
                "Dear " + user.getName()
                        + ",\n\n"
                        + "Your purchase request "
                        + purchaseRequest.getRequestNumber()
                        + " has been submitted successfully.\n\n"
                        + "Current Status: "
                        + purchaseRequest.getStatus());

    }
    
    @Override
    public void sendManagerApprovalEmail(
            User financeManager,
            PurchaseRequest purchaseRequest) {

        sendEmail(
                financeManager.getEmail(),
                "Finance Approval Required",
                "Purchase Request "
                        + purchaseRequest.getRequestNumber()
                        + " is awaiting your approval.\n\n"
                        + "Current Status: "
                        + purchaseRequest.getStatus());

    }
    
    @Override
    public void sendFinalApprovalEmail(
            User requester,
            PurchaseRequest purchaseRequest) {

        sendEmail(
                requester.getEmail(),
                "Purchase Request Approved",
                "Congratulations!\n\n"
                        + "Your Purchase Request "
                        + purchaseRequest.getRequestNumber()
                        + " has been approved.");
    }
        
        @Override
        public void sendFinanceApprovalEmail(
                User procurementManager,
                PurchaseRequest purchaseRequest) {

            sendEmail(
                    procurementManager.getEmail(),
                    "Procurement Approval Required",
                    "Purchase Request "
                            + purchaseRequest.getRequestNumber()
                            + " is awaiting your approval.\n\n"
                            + "Current Status: "
                            + purchaseRequest.getStatus());
        }
        
        @Override
        public void sendProcurementApprovalEmail(
                User requester,
                PurchaseRequest purchaseRequest) {

            sendEmail(
                    requester.getEmail(),
                    "Purchase Request Approved",
                    "Congratulations!\n\n"
                            + "Your Purchase Request "
                            + purchaseRequest.getRequestNumber()
                            + " has been approved.\n\n"
                            + "Status: "
                            + purchaseRequest.getStatus());

        }
}