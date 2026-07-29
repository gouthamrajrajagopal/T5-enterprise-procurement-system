package com.t5.enterpriseprocurement.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.t5.enterpriseprocurement.dto.AuthResponse;
import com.t5.enterpriseprocurement.dto.LoginRequest;
import com.t5.enterpriseprocurement.dto.RegisterRequest;
import com.t5.enterpriseprocurement.entity.Department;
import com.t5.enterpriseprocurement.entity.Role;
import com.t5.enterpriseprocurement.entity.User;
import com.t5.enterpriseprocurement.repository.DepartmentRepository;
import com.t5.enterpriseprocurement.repository.RoleRepository;
import com.t5.enterpriseprocurement.repository.UserRepository;
import com.t5.enterpriseprocurement.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final DepartmentRepository departmentRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(
            UserRepository userRepository,
            RoleRepository roleRepository,
            DepartmentRepository departmentRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.departmentRepository = departmentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public AuthResponse register(RegisterRequest request) {

        String email = request.getEmail().trim().toLowerCase();

        if (userRepository.existsByEmailIgnoreCase(email)) {
            throw new RuntimeException("Email already exists");
        }

        Role role = roleRepository.findById(request.getRoleId())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        Department department = departmentRepository
                .findById(request.getDepartmentId())
                .orElseThrow(() -> new RuntimeException("Department not found"));

        User user = new User();
        user.setName(request.getName());
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setRole(role);
        user.setDepartment(department);
        user.setStatus("ACTIVE");

        User savedUser = userRepository.save(user);

        AuthResponse response = new AuthResponse();
        response.setUserId(savedUser.getUserId());
        response.setName(savedUser.getName());
        response.setRole(savedUser.getRole().getRoleName());
        response.setMessage("Registration successful");

        return response;
    }

    @Override
    public AuthResponse login(LoginRequest request) {

        User user = userRepository
                .findByEmailIgnoreCase(request.getEmail().trim())
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException("Invalid email or password");
        }

        if (!"ACTIVE".equals(user.getStatus())) {
            throw new RuntimeException("User account is inactive");
        }

        AuthResponse response = new AuthResponse();
        response.setUserId(user.getUserId());
        response.setName(user.getName());
        response.setRole(user.getRole().getRoleName());
        response.setMessage("Login successful");

        return response;
    }
}