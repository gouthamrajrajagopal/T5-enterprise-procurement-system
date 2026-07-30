package com.t5.enterpriseprocurement.service;

import com.t5.enterpriseprocurement.dto.AuthResponse;
import com.t5.enterpriseprocurement.dto.LoginRequest;
import com.t5.enterpriseprocurement.dto.RegisterRequest;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}