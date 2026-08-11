package com.t5.enterpriseprocurement.controller;

import org.springframework.http.ResponseEntity;
import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.t5.enterpriseprocurement.dto.PurchaseRequestDTO;
import com.t5.enterpriseprocurement.dto.PurchaseRequestResponseDTO;
import com.t5.enterpriseprocurement.service.PurchaseRequestService;

@RestController
@RequestMapping("/purchase-requests")
public class PurchaseRequestController {

    private final PurchaseRequestService purchaseRequestService;

    public PurchaseRequestController(PurchaseRequestService purchaseRequestService) {
        this.purchaseRequestService = purchaseRequestService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PurchaseRequestResponseDTO createPurchaseRequest(
            @Valid @RequestBody PurchaseRequestDTO requestDTO) {
    	System.out.println("Purchase Request Controller Hit");

        return purchaseRequestService.createPurchaseRequest(requestDTO);
    }

    @GetMapping
    public List<PurchaseRequestResponseDTO> getAllPurchaseRequests() {

        return purchaseRequestService.getAllPurchaseRequests();
    }

    @GetMapping("/{requestId}")
    public PurchaseRequestResponseDTO getPurchaseRequestById(
            @PathVariable Integer requestId) {

        return purchaseRequestService.getPurchaseRequestById(requestId);
    }

    @PutMapping("/{requestId}")
    public PurchaseRequestResponseDTO updatePurchaseRequest(
            @PathVariable Integer requestId,
            @Valid @RequestBody PurchaseRequestDTO requestDTO) {

        return purchaseRequestService.updatePurchaseRequest(
                requestId,
                requestDTO);
    }
    
    @PutMapping("/{requestId}/submit")
    public ResponseEntity<PurchaseRequestResponseDTO> submitRequest(
            @PathVariable Integer requestId) {

        PurchaseRequestResponseDTO response =
                purchaseRequestService.submitRequest(requestId);

        return ResponseEntity.ok(response);
    }
    
    @PutMapping("/{id}/manager-approve")
    public ResponseEntity<PurchaseRequestResponseDTO> managerApprove(
            @PathVariable Integer id) {

        return ResponseEntity.ok(
                purchaseRequestService.managerApprove(id));
    }
    
    @PutMapping("/{id}/finance-approve")
    public ResponseEntity<PurchaseRequestResponseDTO> financeApprove(
            @PathVariable Integer id) {

        return ResponseEntity.ok(
                purchaseRequestService.financeApprove(id));
    }
    
    @PutMapping("/{id}/procurement-approve")
    public ResponseEntity<PurchaseRequestResponseDTO> ownerApprove(
            @PathVariable Integer id) {

        return ResponseEntity.ok(
        		purchaseRequestService.procurementApprove(id));
    }
    
    @PutMapping("/{requestId}/select-supplier/{supplierId}")
    public ResponseEntity<PurchaseRequestResponseDTO> selectSupplier(
            @PathVariable Integer requestId,
            @PathVariable Integer supplierId) {

        return ResponseEntity.ok(
                purchaseRequestService.selectSupplier(requestId, supplierId));
    }

    @DeleteMapping("/{requestId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePurchaseRequest(
            @PathVariable Integer requestId) {

        purchaseRequestService.deletePurchaseRequest(requestId);
    }
}