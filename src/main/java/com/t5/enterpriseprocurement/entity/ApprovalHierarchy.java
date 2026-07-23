package com.t5.enterpriseprocurement.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "approval_hierarchy")
public class ApprovalHierarchy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hierarchy_id")
    private Integer hierarchyId;

    @Column(name = "dept_id")
    private Integer deptId;

    @Column(name = "approval_level")
    private Integer approvalLevel;

    @Column(name = "approver_role_id")
    private Integer approverRoleId;

    @Column(name = "status")
    private String status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Default Constructor
    public ApprovalHierarchy() {
    }

    // Parameterized Constructor
    public ApprovalHierarchy(Integer hierarchyId, Integer deptId, Integer approvalLevel,
            Integer approverRoleId, String status, LocalDateTime createdAt) {
        this.hierarchyId = hierarchyId;
        this.deptId = deptId;
        this.approvalLevel = approvalLevel;
        this.approverRoleId = approverRoleId;
        this.status = status;
        this.createdAt = createdAt;
    }

    public Integer getHierarchyId() {
        return hierarchyId;
    }

    public void setHierarchyId(Integer hierarchyId) {
        this.hierarchyId = hierarchyId;
    }

    public Integer getDeptId() {
        return deptId;
    }

    public void setDeptId(Integer deptId) {
        this.deptId = deptId;
    }

    public Integer getApprovalLevel() {
        return approvalLevel;
    }

    public void setApprovalLevel(Integer approvalLevel) {
        this.approvalLevel = approvalLevel;
    }

    public Integer getApproverRoleId() {
        return approverRoleId;
    }

    public void setApproverRoleId(Integer approverRoleId) {
        this.approverRoleId = approverRoleId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "ApprovalHierarchy [hierarchyId=" + hierarchyId
                + ", deptId=" + deptId
                + ", approvalLevel=" + approvalLevel
                + ", approverRoleId=" + approverRoleId
                + ", status=" + status
                + ", createdAt=" + createdAt + "]";
    }
}