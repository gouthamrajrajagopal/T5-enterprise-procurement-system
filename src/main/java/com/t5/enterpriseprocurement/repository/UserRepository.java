package com.t5.enterpriseprocurement.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.t5.enterpriseprocurement.entity.Role;
import com.t5.enterpriseprocurement.entity.User;


public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
    
    Optional<User> findByRole(Role role);

}