package com.t5.enterpriseprocurement.service;

import java.util.List;

import com.t5.enterpriseprocurement.dto.GeneratePurchaseOrderDTO;
import com.t5.enterpriseprocurement.dto.PurchaseOrderStatusDTO;
import com.t5.enterpriseprocurement.entity.PurchaseOrder;

public interface PurchaseOrderService {

    PurchaseOrder generatePurchaseOrder(
            Integer requestId,
            GeneratePurchaseOrderDTO request
    );

    List<PurchaseOrder> getAllPurchaseOrders();

    PurchaseOrder getPurchaseOrderById(Integer poId);

    PurchaseOrder getPurchaseOrderByRequestId(
            Integer requestId
    );

    List<PurchaseOrder> getPurchaseOrdersBySupplier(
            Integer supplierId
    );

    PurchaseOrder updatePurchaseOrderStatus(
            Integer poId,
            PurchaseOrderStatusDTO request
    );
}