package com.t5.enterpriseprocurement.service;

import java.util.List;

import com.t5.enterpriseprocurement.dto.ApprovalActionDTO;
import com.t5.enterpriseprocurement.entity.Approval;
import com.t5.enterpriseprocurement.entity.PurchaseRequest;

public interface ApprovalService {

    List<PurchaseRequest> getManagerPendingRequests();

    PurchaseRequest managerApprove(
            Integer requestId,
            ApprovalActionDTO action
    );

    PurchaseRequest managerReject(
            Integer requestId,
            ApprovalActionDTO action
    );

    List<PurchaseRequest> getOwnerPendingRequests();

    PurchaseRequest ownerApprove(
            Integer requestId,
            ApprovalActionDTO action
    );

    PurchaseRequest ownerReject(
            Integer requestId,
            ApprovalActionDTO action
    );

    List<PurchaseRequest> getFinancePendingRequests();

    PurchaseRequest financeApprove(
            Integer requestId,
            ApprovalActionDTO action
    );

    PurchaseRequest financeReject(
            Integer requestId,
            ApprovalActionDTO action
    );

    List<Approval> getApprovalHistory(Integer requestId);
}