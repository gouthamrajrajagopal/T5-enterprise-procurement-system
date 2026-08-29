package com.t5.enterpriseprocurement.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.t5.enterpriseprocurement.dto.PurchaseRequestItemDTO;
import com.t5.enterpriseprocurement.dto.PurchaseRequestItemResponseDTO;
import com.t5.enterpriseprocurement.service.PurchaseRequestItemService;

@RestController
@RequestMapping("/purchase-requests/{requestId}/items")
public class PurchaseRequestItemController {

    private final PurchaseRequestItemService purchaseRequestItemService;

    public PurchaseRequestItemController(
            PurchaseRequestItemService purchaseRequestItemService) {

        this.purchaseRequestItemService = purchaseRequestItemService;
    }

    /**
     * Create Item
     */
    @PostMapping
    @PreAuthorize("hasRole('EMPLOYEE')")
    @ResponseStatus(HttpStatus.CREATED)
    public PurchaseRequestItemResponseDTO createItem(
            @PathVariable Integer requestId,
            @RequestBody PurchaseRequestItemDTO dto) {

        return purchaseRequestItemService.createItem(requestId, dto);
    }

    /**
     * Get All Items of a Purchase Request
     */
    @GetMapping
    public List<PurchaseRequestItemResponseDTO> getItems(
            @PathVariable Integer requestId) {

        return purchaseRequestItemService.getItemsByRequestId(requestId);
    }

    /**
     * Update Item
     */
    @PutMapping("/{itemId}")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public PurchaseRequestItemResponseDTO updateItem(
            @PathVariable Integer itemId,
            @RequestBody PurchaseRequestItemDTO dto) {

        return purchaseRequestItemService.updateItem(itemId, dto);
    }

    /**
     * Delete Item
     */
    @DeleteMapping("/{itemId}")
    @PreAuthorize("hasRole('EMPLOYEE')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteItem(
            @PathVariable Integer itemId) {

        purchaseRequestItemService.deleteItem(itemId);
    }

}
