package com.t5.enterpriseprocurement.dto;

public class GoodsReceiptVerifyRequest {

    private Integer verifiedByUserId;
    private Integer acceptedQuantity;
    private Integer rejectedQuantity;
    private String verificationRemarks;

    public Integer getVerifiedByUserId() {
        return verifiedByUserId;
    }

    public void setVerifiedByUserId(Integer verifiedByUserId) {
        this.verifiedByUserId = verifiedByUserId;
    }

    public Integer getAcceptedQuantity() {
        return acceptedQuantity;
    }

    public void setAcceptedQuantity(Integer acceptedQuantity) {
        this.acceptedQuantity = acceptedQuantity;
    }

    public Integer getRejectedQuantity() {
        return rejectedQuantity;
    }

    public void setRejectedQuantity(Integer rejectedQuantity) {
        this.rejectedQuantity = rejectedQuantity;
    }

    public String getVerificationRemarks() {
        return verificationRemarks;
    }

    public void setVerificationRemarks(String verificationRemarks) {
        this.verificationRemarks = verificationRemarks;
    }
}