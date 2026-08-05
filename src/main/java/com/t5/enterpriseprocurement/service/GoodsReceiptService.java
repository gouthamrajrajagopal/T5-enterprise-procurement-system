package com.t5.enterpriseprocurement.service;

import java.util.List;

import com.t5.enterpriseprocurement.dto.GoodsReceiptCreateRequest;
import com.t5.enterpriseprocurement.dto.GoodsReceiptVerifyRequest;
import com.t5.enterpriseprocurement.entity.GoodsReceipt;

public interface GoodsReceiptService {

    GoodsReceipt generateGoodsReceipt(
            GoodsReceiptCreateRequest request
    );

    GoodsReceipt verifyGoodsReceipt(
            Integer grnId,
            GoodsReceiptVerifyRequest request
    );

    List<GoodsReceipt> getAllGoodsReceipts();

    GoodsReceipt getGoodsReceiptById(Integer grnId);

    GoodsReceipt getGoodsReceiptByPurchaseOrderId(
            Integer poId
    );
}