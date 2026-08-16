package com.t5.enterpriseprocurement.dto;
public class ForgotPasswordResponseDTO {
    private final String message;
    private final String resetToken;
    public ForgotPasswordResponseDTO(String resetToken) { this.message = "If an account exists for this email, password reset instructions are available."; this.resetToken = resetToken; }
    public String getMessage() { return message; }
    public String getResetToken() { return resetToken; }
}
