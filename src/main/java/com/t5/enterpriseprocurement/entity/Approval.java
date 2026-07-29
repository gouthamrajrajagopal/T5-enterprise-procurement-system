package com.t5.enterpriseprocurement.entity;

import java.time.LocalDateTime;

import com.t5.enterpriseprocurement.enums.ApprovalStatus;

import jakarta.persistence.*;

@Entity
@Table(name = "approvals")
public class Approval {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "approval_id")
    private Integer approvalId;

    @Column(name = "request_id", nullable = false)
    private Integer requestId;

    @Column(name = "approver_id", nullable = false)
    private Integer approverId;

    @Column(name = "approval_level")
    private Integer approvalLevel;

    @Column(name = "approver_role")
    private String approverRole;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ApprovalStatus status;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "approval_date", insertable = false, updatable = false)
    private LocalDateTime approvalDate;

    public Integer getApprovalId() {
        return approvalId;
    }

    public void setApprovalId(Integer approvalId) {
        this.approvalId = approvalId;
    }

    public Integer getRequestId() {
        return requestId;
    }

    public void setRequestId(Integer requestId) {
        this.requestId = requestId;
    }

    public Integer getApproverId() {
        return approverId;
    }

    public void setApproverId(Integer approverId) {
        this.approverId = approverId;
    }

    public Integer getApprovalLevel() {
        return approvalLevel;
    }

    public void setApprovalLevel(Integer approvalLevel) {
        this.approvalLevel = approvalLevel;
    }

    public String getApproverRole() {
        return approverRole;
    }

    public void setApproverRole(String approverRole) {
        this.approverRole = approverRole;
    }

    public ApprovalStatus getStatus() {
        return status;
    }

    public void setStatus(ApprovalStatus status) {
        this.status = status;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public LocalDateTime getApprovalDate() {
        return approvalDate;
    }
}