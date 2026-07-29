package com.t5.enterpriseprocurement.dto;

import jakarta.validation.constraints.NotNull;

public class VendorSelectionDTO {

    @NotNull(message = "Supplier ID is required")
    private Integer supplierId;

    @NotNull(message = "Selected by user ID is required")
    private Integer selectedByUserId;

    public Integer getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(Integer supplierId) {
        this.supplierId = supplierId;
    }

    public Integer getSelectedByUserId() {
        return selectedByUserId;
    }

    public void setSelectedByUserId(Integer selectedByUserId) {
        this.selectedByUserId = selectedByUserId;
    }
}