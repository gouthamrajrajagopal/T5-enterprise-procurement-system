package com.t5.enterpriseprocurement.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.t5.enterpriseprocurement.dto.GoodsReceiptCreateRequest;
import com.t5.enterpriseprocurement.dto.GoodsReceiptVerifyRequest;
import com.t5.enterpriseprocurement.entity.GoodsReceipt;
import com.t5.enterpriseprocurement.entity.PurchaseOrder;
import com.t5.enterpriseprocurement.entity.PurchaseOrderItem;
import com.t5.enterpriseprocurement.entity.User;
import com.t5.enterpriseprocurement.enums.GoodsReceiptStatus;
import com.t5.enterpriseprocurement.enums.PurchaseOrderStatus;
import com.t5.enterpriseprocurement.repository.GoodsReceiptRepository;
import com.t5.enterpriseprocurement.repository.PurchaseOrderRepository;
import com.t5.enterpriseprocurement.repository.UserRepository;
import com.t5.enterpriseprocurement.service.GoodsReceiptService;

@Service
public class GoodsReceiptServiceImpl
        implements GoodsReceiptService {

    private final GoodsReceiptRepository goodsReceiptRepository;
    private final PurchaseOrderRepository purchaseOrderRepository;
    private final UserRepository userRepository;

    public GoodsReceiptServiceImpl(
            GoodsReceiptRepository goodsReceiptRepository,
            PurchaseOrderRepository purchaseOrderRepository,
            UserRepository userRepository) {

        this.goodsReceiptRepository = goodsReceiptRepository;
        this.purchaseOrderRepository = purchaseOrderRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public GoodsReceipt generateGoodsReceipt(
            GoodsReceiptCreateRequest request) {

        if (request.getPoId() == null) {
            throw new RuntimeException(
                    "Purchase order ID is required"
            );
        }

        if (request.getReceivedByUserId() == null) {
            throw new RuntimeException(
                    "Received-by user ID is required"
            );
        }

        if (goodsReceiptRepository
                .existsByPurchaseOrderPoId(
                        request.getPoId())) {

            throw new RuntimeException(
                    "GRN already exists for this purchase order"
            );
        }

        PurchaseOrder purchaseOrder =
                purchaseOrderRepository
                        .findById(request.getPoId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Purchase order not found"
                                ));

        if (purchaseOrder.getStatus()
                != PurchaseOrderStatus.DELIVERED) {

            throw new RuntimeException(
                    "Purchase order must be DELIVERED before generating GRN"
            );
        }

        User receivedByUser =
                userRepository
                        .findById(
                                request.getReceivedByUserId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Receiving user not found"
                                ));

        int orderedQuantity = purchaseOrder
                .getItems()
                .stream()
                .mapToInt(PurchaseOrderItem::getQuantity)
                .sum();

        if (request.getTotalReceivedQuantity() == null
                || request.getTotalReceivedQuantity() <= 0) {

            throw new RuntimeException(
                    "Received quantity must be greater than zero"
            );
        }

        if (request.getTotalReceivedQuantity()
                > orderedQuantity) {

            throw new RuntimeException(
                    "Received quantity cannot exceed ordered quantity"
            );
        }

        GoodsReceipt goodsReceipt =
                new GoodsReceipt();

        goodsReceipt.setGrnNumber(
                "GRN-" + System.currentTimeMillis()
        );

        goodsReceipt.setPurchaseOrder(
                purchaseOrder
        );

        goodsReceipt.setSupplier(
                purchaseOrder.getSupplier()
        );

        goodsReceipt.setReceivedByUser(
                receivedByUser
        );

        goodsReceipt.setReceivedDate(
                LocalDateTime.now()
        );

        goodsReceipt.setTotalOrderedQuantity(
                orderedQuantity
        );

        goodsReceipt.setTotalReceivedQuantity(
                request.getTotalReceivedQuantity()
        );

        goodsReceipt.setTotalAcceptedQuantity(0);
        goodsReceipt.setTotalRejectedQuantity(0);
        goodsReceipt.setRemarks(
                request.getRemarks()
        );

        if (request.getTotalReceivedQuantity()
                == orderedQuantity) {

            goodsReceipt.setStatus(
                    GoodsReceiptStatus.RECEIVED
            );

        } else {

            goodsReceipt.setStatus(
                    GoodsReceiptStatus.PARTIALLY_RECEIVED
            );
        }

        return goodsReceiptRepository.save(
                goodsReceipt
        );
    }

    @Override
    @Transactional
    public GoodsReceipt verifyGoodsReceipt(
            Integer grnId,
            GoodsReceiptVerifyRequest request) {

        GoodsReceipt goodsReceipt =
                goodsReceiptRepository
                        .findById(grnId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Goods receipt not found"
                                ));

        if (request.getVerifiedByUserId() == null) {
            throw new RuntimeException(
                    "Verified-by user ID is required"
            );
        }

        if (goodsReceipt.getStatus()
                == GoodsReceiptStatus.VERIFIED) {

            throw new RuntimeException(
                    "Goods receipt is already verified"
            );
        }

        User verifiedByUser =
                userRepository
                        .findById(
                                request.getVerifiedByUserId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Verification user not found"
                                ));

        int acceptedQuantity =
                request.getAcceptedQuantity() == null
                        ? 0
                        : request.getAcceptedQuantity();

        int rejectedQuantity =
                request.getRejectedQuantity() == null
                        ? 0
                        : request.getRejectedQuantity();

        if (acceptedQuantity < 0
                || rejectedQuantity < 0) {

            throw new RuntimeException(
                    "Accepted and rejected quantities cannot be negative"
            );
        }

        if (acceptedQuantity + rejectedQuantity
                != goodsReceipt
                .getTotalReceivedQuantity()) {

            throw new RuntimeException(
                    "Accepted quantity plus rejected quantity must equal received quantity"
            );
        }

        goodsReceipt.setVerifiedByUser(
                verifiedByUser
        );

        goodsReceipt.setVerifiedDate(
                LocalDateTime.now()
        );

        goodsReceipt.setTotalAcceptedQuantity(
                acceptedQuantity
        );

        goodsReceipt.setTotalRejectedQuantity(
                rejectedQuantity
        );

        goodsReceipt.setVerificationRemarks(
                request.getVerificationRemarks()
        );

        if (acceptedQuantity == 0) {

            goodsReceipt.setStatus(
                    GoodsReceiptStatus.REJECTED
            );

        } else if (rejectedQuantity > 0) {

            goodsReceipt.setStatus(
                    GoodsReceiptStatus.PARTIALLY_ACCEPTED
            );

        } else {

            goodsReceipt.setStatus(
                    GoodsReceiptStatus.VERIFIED
            );

            PurchaseOrder purchaseOrder =
                    goodsReceipt.getPurchaseOrder();

            purchaseOrder.setStatus(
                    PurchaseOrderStatus.GOODS_VERIFIED
            );

            purchaseOrderRepository.save(
                    purchaseOrder
            );
        }

        return goodsReceiptRepository.save(
                goodsReceipt
        );
    }

    @Override
    public List<GoodsReceipt>
    getAllGoodsReceipts() {

        return goodsReceiptRepository.findAll();
    }

    @Override
    public GoodsReceipt getGoodsReceiptById(
            Integer grnId) {

        return goodsReceiptRepository
                .findById(grnId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Goods receipt not found"
                        ));
    }

    @Override
    public GoodsReceipt
    getGoodsReceiptByPurchaseOrderId(
            Integer poId) {

        return goodsReceiptRepository
                .findByPurchaseOrderPoId(poId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Goods receipt not found for this purchase order"
                        ));
    }
}