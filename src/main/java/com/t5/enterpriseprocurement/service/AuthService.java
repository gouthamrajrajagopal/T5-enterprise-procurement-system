package com.t5.enterpriseprocurement.service;

import com.t5.enterpriseprocurement.dto.LoginRequestDTO;
import com.t5.enterpriseprocurement.dto.LoginResponseDTO;
import com.t5.enterpriseprocurement.dto.RegisterRequestDTO;
import com.t5.enterpriseprocurement.dto.RegisterResponseDTO;
import com.t5.enterpriseprocurement.dto.ForgotPasswordRequestDTO;
import com.t5.enterpriseprocurement.dto.ForgotPasswordResponseDTO;
import com.t5.enterpriseprocurement.dto.ResetPasswordRequestDTO;

public interface AuthService {

    RegisterResponseDTO register(RegisterRequestDTO request);

    LoginResponseDTO login(LoginRequestDTO request);
    ForgotPasswordResponseDTO forgotPassword(ForgotPasswordRequestDTO request);
    void resetPassword(ResetPasswordRequestDTO request);

}
