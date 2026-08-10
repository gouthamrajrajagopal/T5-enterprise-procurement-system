package com.t5.enterpriseprocurement.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.t5.enterpriseprocurement.dto.LoginRequestDTO;
import com.t5.enterpriseprocurement.dto.LoginResponseDTO;
import com.t5.enterpriseprocurement.dto.RegisterRequestDTO;
import com.t5.enterpriseprocurement.dto.RegisterResponseDTO;
import com.t5.enterpriseprocurement.repository.DepartmentRepository;
import com.t5.enterpriseprocurement.repository.RoleRepository;
import com.t5.enterpriseprocurement.repository.UserRepository;
import com.t5.enterpriseprocurement.service.AuthService;
import com.t5.enterpriseprocurement.entity.Department;
import com.t5.enterpriseprocurement.entity.Role;
import com.t5.enterpriseprocurement.entity.User;
import com.t5.enterpriseprocurement.util.JwtUtil;

@Service
public class AuthServiceImpl implements AuthService {
	private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final DepartmentRepository departmentRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(
            UserRepository userRepository,
            RoleRepository roleRepository,
            DepartmentRepository departmentRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {

        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.departmentRepository = departmentRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public RegisterResponseDTO register(RegisterRequestDTO request) {
    	if (userRepository.existsByEmail(request.getEmail())) {
    	    throw new IllegalArgumentException("Email already exists.");
    	}

    	Role role = roleRepository.findByRoleName("EMPLOYEE")
    	        .orElseThrow(() ->
    	                new IllegalArgumentException("Default role EMPLOYEE not found."));

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
}