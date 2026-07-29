package com.t5.enterpriseprocurement.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.t5.enterpriseprocurement.dto.GeneratePurchaseOrderDTO;
import com.t5.enterpriseprocurement.dto.PurchaseOrderStatusDTO;
import com.t5.enterpriseprocurement.entity.PurchaseOrder;
import com.t5.enterpriseprocurement.service.PurchaseOrderService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/purchase-orders")
@CrossOrigin("*")
public class PurchaseOrderController {

    private final PurchaseOrderService purchaseOrderService;

    public PurchaseOrderController(
            PurchaseOrderService purchaseOrderService) {

        this.purchaseOrderService =
                purchaseOrderService;
    }

    @PostMapping("/generate/{requestId}")
    public ResponseEntity<PurchaseOrder>
    generatePurchaseOrder(
            @PathVariable Integer requestId,
            @Valid @RequestBody
            GeneratePurchaseOrderDTO request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        purchaseOrderService
                                .generatePurchaseOrder(
                                        requestId,
                                        request
                                )
                );
    }

    @GetMapping
    public List<PurchaseOrder> getAllPurchaseOrders() {
        return purchaseOrderService
                .getAllPurchaseOrders();
    }

    @GetMapping("/{poId}")
    public PurchaseOrder getPurchaseOrderById(
            @PathVariable Integer poId) {

        return purchaseOrderService
                .getPurchaseOrderById(poId);
    }

    @GetMapping("/request/{requestId}")
    public PurchaseOrder getPurchaseOrderByRequestId(
            @PathVariable Integer requestId) {

        return purchaseOrderService
                .getPurchaseOrderByRequestId(requestId);
    }

    @GetMapping("/supplier/{supplierId}")
    public List<PurchaseOrder>
    getPurchaseOrdersBySupplier(
            @PathVariable Integer supplierId) {

        return purchaseOrderService
                .getPurchaseOrdersBySupplier(supplierId);
    }

    @PutMapping("/{poId}/status")
    public PurchaseOrder updatePurchaseOrderStatus(
            @PathVariable Integer poId,
            @Valid @RequestBody
            PurchaseOrderStatusDTO request) {

        return purchaseOrderService
                .updatePurchaseOrderStatus(
                        poId,
                        request
                );
    }
}