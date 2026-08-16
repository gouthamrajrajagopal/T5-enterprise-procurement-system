package com.t5.enterpriseprocurement.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;

import com.t5.enterpriseprocurement.dto.LoginRequestDTO;
import com.t5.enterpriseprocurement.dto.LoginResponseDTO;
import com.t5.enterpriseprocurement.dto.RegisterRequestDTO;
import com.t5.enterpriseprocurement.dto.RegisterResponseDTO;
import com.t5.enterpriseprocurement.dto.ForgotPasswordRequestDTO;
import com.t5.enterpriseprocurement.dto.ForgotPasswordResponseDTO;
import com.t5.enterpriseprocurement.dto.ResetPasswordRequestDTO;
import com.t5.enterpriseprocurement.repository.DepartmentRepository;
import com.t5.enterpriseprocurement.repository.RoleRepository;
import com.t5.enterpriseprocurement.repository.UserRepository;
import com.t5.enterpriseprocurement.service.AuthService;
import com.t5.enterpriseprocurement.entity.Department;
import com.t5.enterpriseprocurement.entity.Role;
import com.t5.enterpriseprocurement.entity.User;
import com.t5.enterpriseprocurement.util.JwtUtil;
import com.t5.enterpriseprocurement.service.EmailService;
import com.t5.enterpriseprocurement.entity.PasswordResetToken;
import com.t5.enterpriseprocurement.repository.PasswordResetTokenRepository;

@Service
public class AuthServiceImpl implements AuthService {
	private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final DepartmentRepository departmentRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final PasswordResetTokenRepository passwordResetTokenRepository;

    public AuthServiceImpl(
            UserRepository userRepository,
            RoleRepository roleRepository,
            DepartmentRepository departmentRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil,
            EmailService emailService,
            PasswordResetTokenRepository passwordResetTokenRepository) {

        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.departmentRepository = departmentRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.emailService = emailService;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
    }

    @Override
    public RegisterResponseDTO register(RegisterRequestDTO request) {
    	if (userRepository.existsByEmail(request.getEmail())) {
    	    throw new IllegalArgumentException("Email already exists.");
    	}

    	// Public registration is intentionally limited to the Employee role.
    	Role role = roleRepository.findById(7)
    	        .orElseThrow(() -> new RuntimeException("Role not found"));

    	Department department = departmentRepository.findById(request.getDepartmentId())
    	        .orElseThrow(() ->
    	                new IllegalArgumentException("Department not found."));

    	User user = new User();

    	user.setName(request.getName());
    	user.setEmail(request.getEmail());
    	user.setPhone(request.getPhone());

    	user.setRole(role);
    	user.setDepartment(department);

    	user.setStatus("ACTIVE");
    	user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
    	User savedUser = userRepository.save(user);
    	
    	emailService.sendRegistrationEmail(savedUser);

    	return new RegisterResponseDTO(
    	        savedUser.getUserId(),
    	        savedUser.getName(),
    	        savedUser.getEmail(),
    	        "Registration successful."
    	);
    }

    @Override
    public LoginResponseDTO login(LoginRequestDTO request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new IllegalArgumentException("Invalid email or password."));
        boolean matches = passwordEncoder.matches(
                request.getPassword(),
                user.getPasswordHash());

        if (!matches) {
            throw new IllegalArgumentException("Invalid email or password.");
        }

        if (!"ACTIVE".equalsIgnoreCase(user.getStatus())) {
            throw new IllegalArgumentException("User account is inactive.");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        return new LoginResponseDTO(
                token,
                user.getEmail(),
                user.getRole().getRoleName(),
                user.getName()
        );
    }

    @Override
    public ForgotPasswordResponseDTO forgotPassword(ForgotPasswordRequestDTO request) {
        String token = generateResetToken();
        userRepository.findByEmail(request.getEmail()).ifPresent(user -> {
            PasswordResetToken reset = new PasswordResetToken();
            reset.setToken(token);
            reset.setUser(user);
            reset.setExpiry(LocalDateTime.now().plusMinutes(30));
            reset.setUsed(false);
            passwordResetTokenRepository.save(reset);
        });
        return new ForgotPasswordResponseDTO(token);
    }

    @Override
    public void resetPassword(ResetPasswordRequestDTO request) {
        if (request.getPassword() == null || request.getPassword().length() < 6) {
            throw new IllegalArgumentException("Password must be at least 6 characters.");
        }
        PasswordResetToken reset = passwordResetTokenRepository.findByToken(request.getToken())
                .orElseThrow(() -> new IllegalArgumentException("Invalid or expired reset token."));
        if (Boolean.TRUE.equals(reset.getUsed()) || reset.getExpiry().isBefore(LocalDateTime.now()) || reset.getUser() == null) {
            throw new IllegalArgumentException("Invalid or expired reset token.");
        }
        User user = reset.getUser();
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);
        reset.setUsed(true);
        passwordResetTokenRepository.save(reset);
    }

    private String generateResetToken() {
        byte[] bytes = new byte[32];
        new SecureRandom().nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }
}
