package com.t5.enterpriseprocurement.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.t5.enterpriseprocurement.service.EmailService;

@RestController
@RequestMapping("/email")
public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @GetMapping("/test")
    public ResponseEntity<String> sendTestEmail() {

        emailService.sendEmail(
                "goutham@student.tce.edu",
                "Enterprise Procurement Test",
                "Congratulations! Your Spring Boot email service is working successfully.");

        return ResponseEntity.ok("Email sent successfully.");
    }
}