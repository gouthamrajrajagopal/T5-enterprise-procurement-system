package com.t5.enterpriseprocurement.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.t5.enterpriseprocurement.entity.PasswordResetToken;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Integer> {
    Optional<PasswordResetToken> findByToken(String token);
}
