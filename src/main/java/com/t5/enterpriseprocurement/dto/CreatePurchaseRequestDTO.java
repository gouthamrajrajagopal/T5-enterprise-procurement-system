package com.t5.enterpriseprocurement.dto;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CreatePurchaseRequestDTO {

    @NotNull(message = "User ID is required")
    private Integer userId;

    @NotNull(message = "Department ID is required")
    private Integer departmentId;

    @Size(
            min = 5,
            max = 255,
            message = "Purpose must contain 5 to 255 characters"
    )
    private String purpose;

    @Valid
    @NotEmpty(message = "At least one item is required")
    private List<PurchaseRequestItemDTO> items;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Integer departmentId) {
        this.departmentId = departmentId;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public List<PurchaseRequestItemDTO> getItems() {
        return items;
    }

    public void setItems(List<PurchaseRequestItemDTO> items) {
        this.items = items;
    }
}