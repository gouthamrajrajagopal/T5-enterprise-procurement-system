package com.t5.enterpriseprocurement.dto;

import java.math.BigDecimal;

public class DepartmentReportDTO {

    private String departmentName;
    private Long totalRequests;
    private Long purchaseOrders;
    private BigDecimal actualSpend;

    public DepartmentReportDTO(
            String departmentName,
            Long totalRequests,
            Long purchaseOrders,
            BigDecimal actualSpend) {

        this.departmentName = departmentName;
        this.totalRequests = totalRequests;
        this.purchaseOrders = purchaseOrders;
        this.actualSpend = actualSpend;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public Long getTotalRequests() {
        return totalRequests;
    }

    public void setTotalRequests(Long totalRequests) {
        this.totalRequests = totalRequests;
    }

    public Long getPurchaseOrders() {
        return purchaseOrders;
    }

    public void setPurchaseOrders(Long purchaseOrders) {
        this.purchaseOrders = purchaseOrders;
    }

    public BigDecimal getActualSpend() {
        return actualSpend;
    }

    public void setActualSpend(BigDecimal actualSpend) {
        this.actualSpend = actualSpend;
    }
}