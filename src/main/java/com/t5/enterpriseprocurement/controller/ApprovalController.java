package com.t5.enterpriseprocurement.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.t5.enterpriseprocurement.dto.ApprovalActionDTO;
import com.t5.enterpriseprocurement.entity.Approval;
import com.t5.enterpriseprocurement.entity.PurchaseRequest;
import com.t5.enterpriseprocurement.service.ApprovalService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/approvals")
@CrossOrigin("*")
public class ApprovalController {

    private final ApprovalService approvalService;

    public ApprovalController(
            ApprovalService approvalService) {

        this.approvalService = approvalService;
    }

    @GetMapping("/manager/pending")
    public List<PurchaseRequest>
    getManagerPendingRequests() {

        return approvalService
                .getManagerPendingRequests();
    }

    @PutMapping("/manager/{requestId}/approve")
    public PurchaseRequest managerApprove(
            @PathVariable Integer requestId,
            @Valid @RequestBody
            ApprovalActionDTO action) {

        return approvalService.managerApprove(
                requestId,
                action
        );
    }

    @PutMapping("/manager/{requestId}/reject")
    public PurchaseRequest managerReject(
            @PathVariable Integer requestId,
            @Valid @RequestBody
            ApprovalActionDTO action) {

        return approvalService.managerReject(
                requestId,
                action
        );
    }

    @GetMapping("/owner/pending")
    public List<PurchaseRequest>
    getOwnerPendingRequests() {

        return approvalService
                .getOwnerPendingRequests();
    }

    @PutMapping("/owner/{requestId}/approve")
    public PurchaseRequest ownerApprove(
            @PathVariable Integer requestId,
            @Valid @RequestBody
            ApprovalActionDTO action) {

        return approvalService.ownerApprove(
                requestId,
                action
        );
    }

    @PutMapping("/owner/{requestId}/reject")
    public PurchaseRequest ownerReject(
            @PathVariable Integer requestId,
            @Valid @RequestBody
            ApprovalActionDTO action) {

        return approvalService.ownerReject(
                requestId,
                action
        );
    }

    @GetMapping("/finance/pending")
    public List<PurchaseRequest>
    getFinancePendingRequests() {

        return approvalService
                .getFinancePendingRequests();
    }

    @PutMapping("/finance/{requestId}/approve")
    public PurchaseRequest financeApprove(
            @PathVariable Integer requestId,
            @Valid @RequestBody
            ApprovalActionDTO action) {

        return approvalService.financeApprove(
                requestId,
                action
        );
    }

    @PutMapping("/finance/{requestId}/reject")
    public PurchaseRequest financeReject(
            @PathVariable Integer requestId,
            @Valid @RequestBody
            ApprovalActionDTO action) {

        return approvalService.financeReject(
                requestId,
                action
        );
    }

    @GetMapping("/request/{requestId}")
    public List<Approval> getApprovalHistory(
            @PathVariable Integer requestId) {

        return approvalService
                .getApprovalHistory(requestId);
    }
}