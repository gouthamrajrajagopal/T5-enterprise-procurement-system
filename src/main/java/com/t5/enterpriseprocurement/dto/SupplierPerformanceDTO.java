package com.t5.enterpriseprocurement.dto;

import java.math.BigDecimal;

public class SupplierPerformanceDTO {

    private String supplierName;
    private Long purchaseOrders;
    private BigDecimal totalBusiness;
    private String performance;

    public SupplierPerformanceDTO() {
    }

    public SupplierPerformanceDTO(
            String supplierName,
            Long purchaseOrders,
            BigDecimal totalBusiness,
            String performance) {

        this.supplierName = supplierName;
        this.purchaseOrders = purchaseOrders;
        this.totalBusiness = totalBusiness;
        this.performance = performance;
    }

    public String getSupplierName() {
        return supplierName;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    public Long getPurchaseOrders() {
        return purchaseOrders;
    }

    public void setPurchaseOrders(Long purchaseOrders) {
        this.purchaseOrders = purchaseOrders;
    }

    public BigDecimal getTotalBusiness() {
        return totalBusiness;
    }

    public void setTotalBusiness(BigDecimal totalBusiness) {
        this.totalBusiness = totalBusiness;
    }

    public String getPerformance() {
        return performance;
    }

    public void setPerformance(String performance) {
        this.performance = performance;
    }
}