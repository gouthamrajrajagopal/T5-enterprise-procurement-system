package com.t5.enterpriseprocurement.dto;

import com.t5.enterpriseprocurement.enums.PurchaseOrderStatus;

import jakarta.validation.constraints.NotNull;

public class PurchaseOrderStatusDTO {

    @NotNull(message = "Purchase order status is required")
    private PurchaseOrderStatus status;

    public PurchaseOrderStatus getStatus() {
        return status;
    }

    public void setStatus(PurchaseOrderStatus status) {
        this.status = status;
    }
}