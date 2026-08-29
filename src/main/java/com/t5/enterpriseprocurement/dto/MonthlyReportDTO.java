package com.t5.enterpriseprocurement.dto;

import java.math.BigDecimal;

public class MonthlyReportDTO {

    private String month;
    private Long purchaseOrders;
    private BigDecimal totalSpend;

    public MonthlyReportDTO() {
    }

    public MonthlyReportDTO(String month,
                            Long purchaseOrders,
                            BigDecimal totalSpend) {
        this.month = month;
        this.purchaseOrders = purchaseOrders;
        this.totalSpend = totalSpend;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
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
}