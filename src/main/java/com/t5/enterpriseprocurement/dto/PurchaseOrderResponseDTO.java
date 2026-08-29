package com.t5.enterpriseprocurement.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class PurchaseOrderResponseDTO {

    private Integer poId;

    private String poNumber;

    private String requestNumber;

    private Integer requestId;

    private Integer supplierId;

    private String departmentName;

    private String supplierName;

    private BigDecimal totalAmount;

    private String status;

    private LocalDateTime createdAt;

    private List<PurchaseRequestItemResponseDTO> items;

    public PurchaseOrderResponseDTO() {
    }

    public Integer getPoId() {
        return poId;
    }

    public void setPoId(Integer poId) {
        this.poId = poId;
    }

    public String getPoNumber() {
        return poNumber;
    }

    public void setPoNumber(String poNumber) {
        this.poNumber = poNumber;
    }

    public String getRequestNumber() {
        return requestNumber;
    }

    public void setRequestNumber(String requestNumber) {
        this.requestNumber = requestNumber;
    }

    public Integer getRequestId() { return requestId; }
    public void setRequestId(Integer requestId) { this.requestId = requestId; }

    public Integer getSupplierId() { return supplierId; }
    public void setSupplierId(Integer supplierId) { this.supplierId = supplierId; }

    public String getDepartmentName() { return departmentName; }
    public void setDepartmentName(String departmentName) { this.departmentName = departmentName; }

    public String getSupplierName() {
        return supplierName;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
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

    public List<PurchaseRequestItemResponseDTO> getItems() { return items; }
    public void setItems(List<PurchaseRequestItemResponseDTO> items) { this.items = items; }
}
