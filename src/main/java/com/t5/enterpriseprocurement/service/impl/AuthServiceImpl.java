package com.t5.enterpriseprocurement.service.impl;

import com.t5.enterpriseprocurement.dto.AuthResponse;
import com.t5.enterpriseprocurement.dto.LoginRequest;
import com.t5.enterpriseprocurement.dto.RegisterRequest;
import com.t5.enterpriseprocurement.entity.Department;
import com.t5.enterpriseprocurement.entity.Role;
import com.t5.enterpriseprocurement.entity.User;
import com.t5.enterpriseprocurement.repository.DepartmentRepository;
import com.t5.enterpriseprocurement.repository.RoleRepository;
import com.t5.enterpriseprocurement.repository.UserRepository;
import com.t5.enterpriseprocurement.security.JwtService;
import com.t5.enterpriseprocurement.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final DepartmentRepository departmentRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthServiceImpl(
            UserRepository userRepository,
            RoleRepository roleRepository,
            DepartmentRepository departmentRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.departmentRepository =
                departmentRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager =
                authenticationManager;
        this.jwtService = jwtService;
    }

    @Override
    public AuthResponse register(
            RegisterRequest request
    ) {
        String email = request.getEmail()
                .trim()
                .toLowerCase();

        if (userRepository
                .existsByEmailIgnoreCase(email)) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Email already exists"
            );
        }

        Role role = roleRepository
                .findById(request.getRoleId())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.BAD_REQUEST,
                                "Role not found with ID: "
                                        + request.getRoleId()
                        )
                );

        Department department =
                departmentRepository
                        .findById(
                                request.getDepartmentId()
                        )
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.BAD_REQUEST,
                                        "Department not found with ID: "
                                                + request
                                                .getDepartmentId()
                                )
                        );

        User user = new User();

        user.setName(request.getName().trim());
        user.setEmail(email);
        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );
        user.setPhone(request.getPhone());
        user.setRole(role);
        user.setDepartment(department);
        user.setStatus("ACTIVE");

        User savedUser =
                userRepository.save(user);

        AuthResponse response = new AuthResponse();

        response.setUserId(
                savedUser.getUserId()
        );
        response.setName(savedUser.getName());
        response.setRole(
                savedUser.getRole().getRoleName()
        );
        response.setMessage(
                "Registration successful"
        );
        response.setToken(null);

        return response;
    }

    @Override
    public AuthResponse login(
            LoginRequest request
    ) {
        String email = request.getEmail()
                .trim()
                .toLowerCase();

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            email,
                            request.getPassword()
                    )
            );
        } catch (AuthenticationException exception) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid email or password"
            );
        } catch (Exception exception) {
            throw new AuthenticationServiceException(
                    "Authentication failed",
                    exception
            );
        }

        User user = userRepository
                .findByEmailIgnoreCase(email)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "User not found"
                        )
                );

        if (user.getStatus() != null
                && !"ACTIVE".equalsIgnoreCase(
                user.getStatus()
        )) {

            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "User account is inactive"
            );
        }

        if (user.getRole() == null) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "User role is not assigned"
            );
        }

        String roleName =
                user.getRole().getRoleName();

        String token =
                jwtService.generateToken(
                        user.getEmail(),
                        roleName,
                        user.getUserId()
                );

        AuthResponse response = new AuthResponse();

        response.setUserId(user.getUserId());
        response.setName(user.getName());
        response.setRole(roleName);
        response.setMessage("Login successful");
        response.setToken(token);

        return response;
    }
}