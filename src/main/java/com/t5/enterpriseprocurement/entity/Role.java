package com.t5.enterpriseprocurement.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Integer roleId;

    @Column(name = "role_name")
    private String roleName;

    @Column(name = "description")
    private String description;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public Role() {
    }

    public Role(Integer roleId, String roleName, String description, LocalDateTime createdAt) {
        super();
        this.roleId = roleId;
        this.roleName = roleName;
        this.description = description;
        this.createdAt = createdAt;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "Role [roleId=" + roleId
                + ", roleName=" + roleName
                + ", description=" + description
                + ", createdAt=" + createdAt + "]";
    }
}