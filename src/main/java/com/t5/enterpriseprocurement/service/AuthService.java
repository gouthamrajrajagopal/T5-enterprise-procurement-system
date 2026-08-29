package com.t5.enterpriseprocurement.service;

import com.t5.enterpriseprocurement.dto.LoginRequestDTO;
import com.t5.enterpriseprocurement.dto.LoginResponseDTO;
import com.t5.enterpriseprocurement.dto.RegisterRequestDTO;
import com.t5.enterpriseprocurement.dto.RegisterResponseDTO;

public interface AuthService {

    RegisterResponseDTO register(RegisterRequestDTO request);

    LoginResponseDTO login(LoginRequestDTO request);

}