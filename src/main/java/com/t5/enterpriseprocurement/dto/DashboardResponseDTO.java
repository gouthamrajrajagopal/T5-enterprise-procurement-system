package com.t5.enterpriseprocurement.dto;

import java.math.BigDecimal;

public class DashboardResponseDTO {

    private Long totalRequests;
    private Long pendingRequests;
    private Long approvedRequests;
    private Long purchaseOrders;
    private BigDecimal totalSpend;
    private Long totalSuppliers;
    private Long totalDepartments;

    public DashboardResponseDTO() {
    }

    public Long getTotalRequests() {
        return totalRequests;
    }

    public void setTotalRequests(Long totalRequests) {
        this.totalRequests = totalRequests;
    }

    public Long getPendingRequests() {
        return pendingRequests;
    }

    public void setPendingRequests(Long pendingRequests) {
        this.pendingRequests = pendingRequests;
    }

    public Long getApprovedRequests() {
        return approvedRequests;
    }

    public void setApprovedRequests(Long approvedRequests) {
        this.approvedRequests = approvedRequests;
    }

    public Long getPurchaseOrders() {
        return purchaseOrders;
    }

    public void setPurchaseOrders(Long purchaseOrders) {
        this.purchaseOrders = purchaseOrders;
    }

    public BigDecimal getTotalSpend() {
        return totalSpend;
    }

    public void setTotalSpend(BigDecimal totalSpend) {
        this.totalSpend = totalSpend;
    }

    public Long getTotalSuppliers() {
        return totalSuppliers;
    }

    public void setTotalSuppliers(Long totalSuppliers) {
        this.totalSuppliers = totalSuppliers;
    }

    public Long getTotalDepartments() {
        return totalDepartments;
    }

    public void setTotalDepartments(Long totalDepartments) {
        this.totalDepartments = totalDepartments;
    }
}