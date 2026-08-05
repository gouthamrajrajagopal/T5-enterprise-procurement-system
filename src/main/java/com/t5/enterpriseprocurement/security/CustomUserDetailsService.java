package com.t5.enterpriseprocurement.security;

import com.t5.enterpriseprocurement.entity.User;
import com.t5.enterpriseprocurement.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService
        implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(
            UserRepository userRepository
    ) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(
            String email
    ) throws UsernameNotFoundException {

        User user = userRepository
                .findByEmailIgnoreCase(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "User not found with email: "
                                        + email
                        )
                );

        if (user.getRole() == null) {
            throw new UsernameNotFoundException(
                    "Role is not assigned to user: "
                            + email
            );
        }

        String roleName =
                user.getRole().getRoleName();

        boolean accountEnabled =
                user.getStatus() == null
                        || "ACTIVE".equalsIgnoreCase(
                        user.getStatus()
                );

        return org.springframework.security
                .core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .roles(roleName)
                .disabled(!accountEnabled)
                .build();
    }
}