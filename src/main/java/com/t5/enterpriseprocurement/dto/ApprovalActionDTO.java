package com.t5.enterpriseprocurement.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ApprovalActionDTO {

    @NotNull(message = "Approver ID is required")
    private Integer approverId;

    @Size(
            max = 255,
            message = "Remarks cannot exceed 255 characters"
    )
    private String remarks;

    public Integer getApproverId() {
        return approverId;
    }

    public void setApproverId(Integer approverId) {
        this.approverId = approverId;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
}