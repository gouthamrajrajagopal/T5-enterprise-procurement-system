package com.t5.enterpriseprocurement.entity;

import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
@Table(name = "password_reset_tokens")
public class PasswordResetToken {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false, unique = true, length = 128)
    private String token;
    @ManyToOne @JoinColumn(name = "user_id")
    private User user;
    @Column(nullable = false)
    private LocalDateTime expiry;
    @Column(nullable = false)
    private Boolean used = false;
    public Integer getId() { return id; }
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public LocalDateTime getExpiry() { return expiry; }
    public void setExpiry(LocalDateTime expiry) { this.expiry = expiry; }
    public Boolean getUsed() { return used; }
    public void setUsed(Boolean used) { this.used = used; }
}
