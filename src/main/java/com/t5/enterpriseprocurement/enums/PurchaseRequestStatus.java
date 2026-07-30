package com.t5.enterpriseprocurement.enums;

public enum PurchaseRequestStatus {
    DRAFT,
    PENDING_MANAGER_APPROVAL,
    PENDING_OWNER_APPROVAL,
    PENDING_FINANCE_APPROVAL,
    APPROVED,
    REJECTED,
    CANCELLED,
    VENDOR_SELECTION_PENDING,
    VENDOR_SELECTED,
    PO_GENERATED
}