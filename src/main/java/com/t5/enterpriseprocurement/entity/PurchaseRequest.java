package com.t5.enterpriseprocurement.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.t5.enterpriseprocurement.enums.PurchaseRequestStatus;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;

@Entity
@Table(name = "purchase_requests")
public class PurchaseRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    private Integer requestId;

    @Column(name = "request_number", unique = true)
    private String requestNumber;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;

    @Column(name = "purpose")
    private String purpose;

    @Column(name = "total_quantity")
    private Integer totalQuantity;

    @Column(name = "total_amount")
    private BigDecimal totalAmount;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private PurchaseRequestStatus status;

    @Column(name = "current_approval_level")
    private Integer currentApprovalLevel;

    @Column(name = "created_date", insertable = false, updatable = false)
    private LocalDateTime createdDate;

    @Column(name = "updated_at", insertable = false, updatable = false)
    private LocalDateTime updatedAt;

    @OneToMany(
            mappedBy = "purchaseRequest",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.EAGER
    )
    @JsonManagedReference
    private List<PurchaseRequestItem> items = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "selected_supplier_id")
    private Supplier selectedSupplier;

    public Integer getRequestId() {
        return requestId;
    }

    public void setRequestId(Integer requestId) {
        this.requestId = requestId;
    }

    public String getRequestNumber() {
        return requestNumber;
    }

    public void setRequestNumber(String requestNumber) {
        this.requestNumber = requestNumber;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public Integer getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalQuantity(Integer totalQuantity) {
        this.totalQuantity = totalQuantity;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public PurchaseRequestStatus getStatus() {
        return status;
    }

    public void setStatus(PurchaseRequestStatus status) {
        this.status = status;
    }

    public Integer getCurrentApprovalLevel() {
        return currentApprovalLevel;
    }

    public void setCurrentApprovalLevel(Integer currentApprovalLevel) {
        this.currentApprovalLevel = currentApprovalLevel;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public List<PurchaseRequestItem> getItems() {
        return items;
    }

    public void setItems(List<PurchaseRequestItem> items) {
        this.items = items;
    }

    public Supplier getSelectedSupplier() {
        return selectedSupplier;
    }

    public void setSelectedSupplier(Supplier selectedSupplier) {
        this.selectedSupplier = selectedSupplier;
    }
}