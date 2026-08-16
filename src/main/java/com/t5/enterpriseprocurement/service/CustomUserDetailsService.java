package com.t5.enterpriseprocurement.service;

import java.util.Collections;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.t5.enterpriseprocurement.entity.User;
import com.t5.enterpriseprocurement.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found: " + email));

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPasswordHash(),
                Collections.singletonList(
                        new SimpleGrantedAuthority(
                                "ROLE_" + normalizeRoleName(
                                        user.getRole().getRoleName())))
        );
    }

    private String normalizeRoleName(String roleName) {
        return switch (roleName) {
            case "Manager" -> "MANAGER";
            case "Finance Manager" -> "FINANCE";
            case "Procurement Manager" -> "PROCUREMENT";
            default -> roleName;
        };
    }
}
