package com.t5.enterpriseprocurement.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> {})
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/suppliers/**").permitAll()
                        .requestMatchers("/categories/**").permitAll()
                        .requestMatchers("/departments/**").permitAll()
                        .requestMatchers("/approval-hierarchy/**").permitAll()
                        .requestMatchers("/purchase-requests/**").permitAll()
                        .requestMatchers("/approvals/**").permitAll()
                        .requestMatchers("/purchase-orders/**").permitAll()
                        .requestMatchers("/vendor-selection/**").permitAll()
                        .anyRequest().permitAll()
                );

        return http.build();
    }
}