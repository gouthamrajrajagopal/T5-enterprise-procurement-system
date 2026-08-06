package com.t5.enterpriseprocurement.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.t5.enterpriseprocurement.dto.VendorSelectionDTO;
import com.t5.enterpriseprocurement.entity.PurchaseRequest;
import com.t5.enterpriseprocurement.service.VendorSelectionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/vendor-selection")
@CrossOrigin("*")
public class VendorSelectionController {

    private final VendorSelectionService vendorSelectionService;

    public VendorSelectionController(
            VendorSelectionService vendorSelectionService) {

        this.vendorSelectionService =
                vendorSelectionService;
    }

    @GetMapping("/pending")
    public List<PurchaseRequest>
    getVendorSelectionPendingRequests() {

        return vendorSelectionService
                .getVendorSelectionPendingRequests();
    }

    @PutMapping("/{requestId}/select")
    public PurchaseRequest selectVendor(
            @PathVariable Integer requestId,
            @Valid @RequestBody
            VendorSelectionDTO selection) {

        return vendorSelectionService
                .selectVendor(requestId, selection);
    }
    @GetMapping("/processed")
    public List<PurchaseRequest>
    getProcessedVendorSelections() {

        return vendorSelectionService
                .getProcessedVendorSelections();
    }
}