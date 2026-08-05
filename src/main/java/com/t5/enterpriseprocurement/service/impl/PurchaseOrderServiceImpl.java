package com.t5.enterpriseprocurement.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.t5.enterpriseprocurement.dto.GeneratePurchaseOrderDTO;
import com.t5.enterpriseprocurement.dto.PurchaseOrderStatusDTO;
import com.t5.enterpriseprocurement.entity.PurchaseOrder;
import com.t5.enterpriseprocurement.entity.PurchaseOrderItem;
import com.t5.enterpriseprocurement.entity.PurchaseRequest;
import com.t5.enterpriseprocurement.entity.PurchaseRequestItem;
import com.t5.enterpriseprocurement.entity.User;
import com.t5.enterpriseprocurement.enums.PurchaseOrderStatus;
import com.t5.enterpriseprocurement.enums.PurchaseRequestStatus;
import com.t5.enterpriseprocurement.repository.PurchaseOrderRepository;
import com.t5.enterpriseprocurement.repository.PurchaseRequestRepository;
import com.t5.enterpriseprocurement.repository.UserRepository;
import com.t5.enterpriseprocurement.service.PurchaseOrderService;

@Service
public class PurchaseOrderServiceImpl
        implements PurchaseOrderService {

    private final PurchaseOrderRepository purchaseOrderRepository;
    private final PurchaseRequestRepository purchaseRequestRepository;
    private final UserRepository userRepository;

    public PurchaseOrderServiceImpl(
            PurchaseOrderRepository purchaseOrderRepository,
            PurchaseRequestRepository purchaseRequestRepository,
            UserRepository userRepository) {

        this.purchaseOrderRepository = purchaseOrderRepository;
        this.purchaseRequestRepository = purchaseRequestRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public PurchaseOrder generatePurchaseOrder(
            Integer requestId,
            GeneratePurchaseOrderDTO generateRequest) {

        PurchaseRequest purchaseRequest =
                purchaseRequestRepository.findById(requestId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Purchase request not found"
                                ));

        if (purchaseRequest.getStatus()
                != PurchaseRequestStatus.VENDOR_SELECTED) {

            throw new RuntimeException(
                    "Purchase order can only be generated "
                            + "after vendor selection"
            );
        }

        if (purchaseRequest.getSelectedSupplier() == null) {
            throw new RuntimeException(
                    "No supplier has been selected"
            );
        }

        if (purchaseOrderRepository
                .existsByPurchaseRequestRequestId(requestId)) {

            throw new RuntimeException(
                    "Purchase order already exists "
                            + "for this purchase request"
            );
        }

        User generatedBy = userRepository
                .findById(generateRequest.getGeneratedByUserId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Generating user not found"
                        ));

        String role = generatedBy
                .getRole()
                .getRoleName();

        if (!"ADMIN".equalsIgnoreCase(role)
                && !"MANAGER".equalsIgnoreCase(role)) {

            throw new RuntimeException(
                    "Only ADMIN or Manager can "
                            + "generate a purchase order"
            );
        }

        if (!"ACTIVE".equalsIgnoreCase(
                generatedBy.getStatus())) {

            throw new RuntimeException(
                    "Generating user account is inactive"
            );
        }

        PurchaseOrder purchaseOrder =
                new PurchaseOrder();

        purchaseOrder.setPoNumber(
                "PO-" + System.currentTimeMillis()
        );

        purchaseOrder.setPurchaseRequest(purchaseRequest);
        purchaseOrder.setSupplier(
                purchaseRequest.getSelectedSupplier()
        );

        purchaseOrder.setStatus(
                PurchaseOrderStatus.CREATED
        );

        purchaseOrder.setTotalAmount(
                purchaseRequest.getTotalAmount()
        );

        purchaseOrder.setOrderDate(LocalDate.now());

        purchaseOrder.setExpectedDeliveryDate(
                generateRequest.getExpectedDeliveryDate()
        );

        List<PurchaseOrderItem> poItems =
                new ArrayList<>();

        for (PurchaseRequestItem requestItem
                : purchaseRequest.getItems()) {

            PurchaseOrderItem poItem =
                    new PurchaseOrderItem();

            poItem.setPurchaseOrder(purchaseOrder);
            poItem.setItemName(
                    requestItem.getItemName()
            );
            poItem.setItemDescription(
                    requestItem.getItemDescription()
            );
            poItem.setQuantity(
                    requestItem.getQuantity()
            );
            poItem.setUnitPrice(
                    requestItem.getEstimatedPrice()
            );
            poItem.setTotalPrice(
                    requestItem.getTotalPrice()
            );

            poItems.add(poItem);
        }

        purchaseOrder.setItems(poItems);

        PurchaseOrder savedPurchaseOrder =
                purchaseOrderRepository.save(purchaseOrder);

        purchaseRequest.setStatus(
                PurchaseRequestStatus.PO_GENERATED
        );

        purchaseRequestRepository.save(purchaseRequest);

        return savedPurchaseOrder;
    }

    @Override
    public List<PurchaseOrder> getAllPurchaseOrders() {
        return purchaseOrderRepository.findAll();
    }

    @Override
    public PurchaseOrder getPurchaseOrderById(
            Integer poId) {

        return purchaseOrderRepository.findById(poId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Purchase order not found"
                        ));
    }

    @Override
    public PurchaseOrder getPurchaseOrderByRequestId(
            Integer requestId) {

        return purchaseOrderRepository
                .findByPurchaseRequestRequestId(requestId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Purchase order not found "
                                        + "for this request"
                        ));
    }

    @Override
    public List<PurchaseOrder>
    getPurchaseOrdersBySupplier(Integer supplierId) {

        return purchaseOrderRepository
                .findBySupplierSupplierId(supplierId);
    }

    @Override
    @Transactional
    public PurchaseOrder updatePurchaseOrderStatus(
            Integer poId,
            PurchaseOrderStatusDTO statusRequest) {

        PurchaseOrder purchaseOrder =
                getPurchaseOrderById(poId);

        PurchaseOrderStatus newStatus =
                statusRequest.getStatus();

        purchaseOrder.setStatus(newStatus);

        if (newStatus
                == PurchaseOrderStatus.DELIVERED) {

            purchaseOrder.setActualDeliveryDate(
                    LocalDate.now()
            );
        }

        return purchaseOrderRepository.save(
                purchaseOrder
        );
    }
}