package com.t5.enterpriseprocurement.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.t5.enterpriseprocurement.dto.CreatePurchaseRequestDTO;
import com.t5.enterpriseprocurement.entity.PurchaseRequest;
import com.t5.enterpriseprocurement.service.PurchaseRequestService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/purchase-requests")
@CrossOrigin("*")
public class PurchaseRequestController {

    private final PurchaseRequestService purchaseRequestService;

    public PurchaseRequestController(
            PurchaseRequestService purchaseRequestService) {
        this.purchaseRequestService = purchaseRequestService;
    }

    @PostMapping
    public ResponseEntity<PurchaseRequest> createRequest(
            @Valid @RequestBody
            CreatePurchaseRequestDTO request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        purchaseRequestService.createRequest(request)
                );
    }

    @GetMapping
    public List<PurchaseRequest> getAllRequests() {
        return purchaseRequestService.getAllRequests();
    }

    @GetMapping("/{requestId}")
    public PurchaseRequest getRequestById(
            @PathVariable Integer requestId) {

        return purchaseRequestService
                .getRequestById(requestId);
    }

    @GetMapping("/user/{userId}")
    public List<PurchaseRequest> getRequestsByUser(
            @PathVariable Integer userId) {

        return purchaseRequestService
                .getRequestsByUser(userId);
    }

    @GetMapping("/pending")
    public List<PurchaseRequest> getPendingRequests() {
        return purchaseRequestService
                .getPendingRequests();
    }

    @PutMapping("/{requestId}")
    public PurchaseRequest updateRequest(
            @PathVariable Integer requestId,
            @Valid @RequestBody
            CreatePurchaseRequestDTO request) {

        return purchaseRequestService
                .updateRequest(requestId, request);
    }
    
    @PutMapping("/{requestId}/select-supplier/{supplierId}")
    public PurchaseRequest selectSupplier(
            @PathVariable Integer requestId,
            @PathVariable Integer supplierId) {

        return purchaseRequestService.selectSupplier(
                requestId,
                supplierId
        );
    }

    @DeleteMapping("/{requestId}")
    public ResponseEntity<String> cancelRequest(
            @PathVariable Integer requestId) {

        purchaseRequestService.cancelRequest(requestId);

        return ResponseEntity.ok(
                "Purchase request cancelled successfully"
        );
    }
}