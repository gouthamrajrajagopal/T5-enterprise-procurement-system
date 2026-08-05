package com.t5.enterpriseprocurement.dto;

import jakarta.validation.constraints.NotNull;

public class SelectSupplierDTO {

    @NotNull(message = "Supplier ID is required")
    private Integer supplierId;

    public Integer getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(Integer supplierId) {
        this.supplierId = supplierId;
    }
}