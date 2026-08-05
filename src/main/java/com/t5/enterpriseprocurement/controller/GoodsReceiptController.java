package com.t5.enterpriseprocurement.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.t5.enterpriseprocurement.dto.GoodsReceiptCreateRequest;
import com.t5.enterpriseprocurement.dto.GoodsReceiptVerifyRequest;
import com.t5.enterpriseprocurement.entity.GoodsReceipt;
import com.t5.enterpriseprocurement.service.GoodsReceiptService;

@RestController
@RequestMapping("/goods-receipts")
@CrossOrigin("*")
public class GoodsReceiptController {

    private final GoodsReceiptService goodsReceiptService;

    public GoodsReceiptController(
            GoodsReceiptService goodsReceiptService) {

        this.goodsReceiptService =
                goodsReceiptService;
    }

    @PostMapping
    public ResponseEntity<GoodsReceipt>
    generateGoodsReceipt(
            @RequestBody
            GoodsReceiptCreateRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        goodsReceiptService
                                .generateGoodsReceipt(
                                        request
                                )
                );
    }

    @PutMapping("/{grnId}/verify")
    public ResponseEntity<GoodsReceipt>
    verifyGoodsReceipt(
            @PathVariable Integer grnId,
            @RequestBody
            GoodsReceiptVerifyRequest request) {

        return ResponseEntity.ok(
                goodsReceiptService
                        .verifyGoodsReceipt(
                                grnId,
                                request
                        )
        );
    }

    @GetMapping
    public List<GoodsReceipt>
    getAllGoodsReceipts() {

        return goodsReceiptService
                .getAllGoodsReceipts();
    }

    @GetMapping("/{grnId}")
    public GoodsReceipt getGoodsReceiptById(
            @PathVariable Integer grnId) {

        return goodsReceiptService
                .getGoodsReceiptById(grnId);
    }

    @GetMapping("/purchase-order/{poId}")
    public GoodsReceipt
    getGoodsReceiptByPurchaseOrderId(
            @PathVariable Integer poId) {

        return goodsReceiptService
                .getGoodsReceiptByPurchaseOrderId(
                        poId
                );
    }
}