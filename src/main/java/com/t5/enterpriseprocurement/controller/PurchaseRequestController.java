package com.t5.enterpriseprocurement.controller;

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

    @DeleteMapping("/{requestId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePurchaseRequest(
            @PathVariable Integer requestId) {

        purchaseRequestService.deletePurchaseRequest(requestId);
    }
}