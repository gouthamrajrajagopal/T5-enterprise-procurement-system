package com.t5.enterpriseprocurement.dto;

import java.math.BigDecimal;

public class SpendAnalysisDTO {

    private BigDecimal totalSpend;
    private BigDecimal averagePurchase;
    private BigDecimal highestPurchase;
    private BigDecimal lowestPurchase;
    private Long totalPurchaseOrders;

    public SpendAnalysisDTO() {
    }

    public BigDecimal getTotalSpend() {
        return totalSpend;
    }

    public void setTotalSpend(BigDecimal totalSpend) {
        this.totalSpend = totalSpend;
    }

    public BigDecimal getAveragePurchase() {
        return averagePurchase;
    }

    public void setAveragePurchase(BigDecimal averagePurchase) {
        this.averagePurchase = averagePurchase;
    }

    public BigDecimal getHighestPurchase() {
        return highestPurchase;
    }

    public void setHighestPurchase(BigDecimal highestPurchase) {
        this.highestPurchase = highestPurchase;
    }

    public BigDecimal getLowestPurchase() {
        return lowestPurchase;
    }

    public void setLowestPurchase(BigDecimal lowestPurchase) {
        this.lowestPurchase = lowestPurchase;
    }

    public Long getTotalPurchaseOrders() {
        return totalPurchaseOrders;
    }

    public void setTotalPurchaseOrders(Long totalPurchaseOrders) {
        this.totalPurchaseOrders = totalPurchaseOrders;
    }
}