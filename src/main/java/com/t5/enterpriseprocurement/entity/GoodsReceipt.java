package com.t5.enterpriseprocurement.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import com.t5.enterpriseprocurement.enums.GoodsReceiptStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "goods_receipts")
public class GoodsReceipt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "grn_id")
    private Integer grnId;

    @Column(name = "grn_number", nullable = false, unique = true)
    private String grnNumber;

    @ManyToOne
    @JoinColumn(name = "po_id", nullable = false)
    @JsonIgnoreProperties({"items", "purchaseRequest"})
    private PurchaseOrder purchaseOrder;

    @ManyToOne
    @JoinColumn(name = "supplier_id", nullable = false)
    @JsonIgnoreProperties({"purchaseOrders"})
    private Supplier supplier;

    @ManyToOne
    @JoinColumn(name = "received_by_user_id", nullable = false)
    @JsonIgnoreProperties({"password", "purchaseRequests"})
    private User receivedByUser;

    @ManyToOne
    @JoinColumn(name = "verified_by_user_id")
    @JsonIgnoreProperties({"password", "purchaseRequests"})
    private User verifiedByUser;

    @Column(name = "received_date")
    private LocalDateTime receivedDate;

    @Column(name = "verified_date")
    private LocalDateTime verifiedDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private GoodsReceiptStatus status;

    @Column(name = "total_ordered_quantity")
    private Integer totalOrderedQuantity;

    @Column(name = "total_received_quantity")
    private Integer totalReceivedQuantity;

    @Column(name = "total_accepted_quantity")
    private Integer totalAcceptedQuantity;

    @Column(name = "total_rejected_quantity")
    private Integer totalRejectedQuantity;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "verification_remarks")
    private String verificationRemarks;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        LocalDateTime now = LocalDateTime.now();

        createdAt = now;
        updatedAt = now;

        if (receivedDate == null) {
            receivedDate = now;
        }

        if (status == null) {
            status = GoodsReceiptStatus.RECEIVED;
        }

        if (totalAcceptedQuantity == null) {
            totalAcceptedQuantity = 0;
        }

        if (totalRejectedQuantity == null) {
            totalRejectedQuantity = 0;
        }
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public Integer getGrnId() {
        return grnId;
    }

    public void setGrnId(Integer grnId) {
        this.grnId = grnId;
    }

    public String getGrnNumber() {
        return grnNumber;
    }

    public void setGrnNumber(String grnNumber) {
        this.grnNumber = grnNumber;
    }

    public PurchaseOrder getPurchaseOrder() {
        return purchaseOrder;
    }

    public void setPurchaseOrder(PurchaseOrder purchaseOrder) {
        this.purchaseOrder = purchaseOrder;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }

    public User getReceivedByUser() {
        return receivedByUser;
    }

    public void setReceivedByUser(User receivedByUser) {
        this.receivedByUser = receivedByUser;
    }

    public User getVerifiedByUser() {
        return verifiedByUser;
    }

    public void setVerifiedByUser(User verifiedByUser) {
        this.verifiedByUser = verifiedByUser;
    }

    public LocalDateTime getReceivedDate() {
        return receivedDate;
    }

    public void setReceivedDate(LocalDateTime receivedDate) {
        this.receivedDate = receivedDate;
    }

    public LocalDateTime getVerifiedDate() {
        return verifiedDate;
    }

    public void setVerifiedDate(LocalDateTime verifiedDate) {
        this.verifiedDate = verifiedDate;
    }

    public GoodsReceiptStatus getStatus() {
        return status;
    }

    public void setStatus(GoodsReceiptStatus status) {
        this.status = status;
    }

    public Integer getTotalOrderedQuantity() {
        return totalOrderedQuantity;
    }

    public void setTotalOrderedQuantity(Integer totalOrderedQuantity) {
        this.totalOrderedQuantity = totalOrderedQuantity;
    }

    public Integer getTotalReceivedQuantity() {
        return totalReceivedQuantity;
    }

    public void setTotalReceivedQuantity(Integer totalReceivedQuantity) {
        this.totalReceivedQuantity = totalReceivedQuantity;
    }

    public Integer getTotalAcceptedQuantity() {
        return totalAcceptedQuantity;
    }

    public void setTotalAcceptedQuantity(Integer totalAcceptedQuantity) {
        this.totalAcceptedQuantity = totalAcceptedQuantity;
    }

    public Integer getTotalRejectedQuantity() {
        return totalRejectedQuantity;
    }

    public void setTotalRejectedQuantity(Integer totalRejectedQuantity) {
        this.totalRejectedQuantity = totalRejectedQuantity;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getVerificationRemarks() {
        return verificationRemarks;
    }

    public void setVerificationRemarks(String verificationRemarks) {
        this.verificationRemarks = verificationRemarks;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}