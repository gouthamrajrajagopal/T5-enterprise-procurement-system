package com.t5.enterpriseprocurement.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.t5.enterpriseprocurement.dto.LoginRequestDTO;
import com.t5.enterpriseprocurement.dto.LoginResponseDTO;
import com.t5.enterpriseprocurement.dto.RegisterRequestDTO;
import com.t5.enterpriseprocurement.dto.RegisterResponseDTO;
import com.t5.enterpriseprocurement.dto.ForgotPasswordRequestDTO;
import com.t5.enterpriseprocurement.dto.ForgotPasswordResponseDTO;
import com.t5.enterpriseprocurement.dto.ResetPasswordRequestDTO;
import com.t5.enterpriseprocurement.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDTO> register(
            @RequestBody RegisterRequestDTO request) {

        RegisterResponseDTO response = authService.register(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(
            @RequestBody LoginRequestDTO request) {

        LoginResponseDTO response = authService.login(request);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ForgotPasswordResponseDTO> forgotPassword(@RequestBody ForgotPasswordRequestDTO request) {
        return ResponseEntity.ok(authService.forgotPassword(request));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Void> resetPassword(@RequestBody ResetPasswordRequestDTO request) {
        authService.resetPassword(request);
        return ResponseEntity.noContent().build();
    }
}
