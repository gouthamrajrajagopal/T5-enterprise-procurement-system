package com.t5.enterpriseprocurement.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.t5.enterpriseprocurement.dto.PurchaseOrderResponseDTO;
import com.t5.enterpriseprocurement.service.PurchaseOrderService;

@RestController
@RequestMapping("/purchase-orders")
public class PurchaseOrderController {

    private final PurchaseOrderService purchaseOrderService;

    public PurchaseOrderController(
            PurchaseOrderService purchaseOrderService) {

        this.purchaseOrderService = purchaseOrderService;
    }

    @PostMapping("/generate/{requestId}")
    public ResponseEntity<PurchaseOrderResponseDTO> generatePurchaseOrder(
            @PathVariable Integer requestId) {

        return ResponseEntity.ok(
                purchaseOrderService.generatePurchaseOrder(requestId));
    }

    @GetMapping
    public ResponseEntity<List<PurchaseOrderResponseDTO>> getPurchaseOrders() {
        return ResponseEntity.ok(purchaseOrderService.getPurchaseOrders());
    }

    @GetMapping("/{poId}")
    public ResponseEntity<PurchaseOrderResponseDTO> getPurchaseOrder(@PathVariable Integer poId) {
        return ResponseEntity.ok(purchaseOrderService.getPurchaseOrderById(poId));
    }
}
