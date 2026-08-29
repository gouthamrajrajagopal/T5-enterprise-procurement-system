package com.t5.enterpriseprocurement.service;

import com.t5.enterpriseprocurement.dto.PurchaseOrderResponseDTO;

public interface PurchaseOrderService {

    PurchaseOrderResponseDTO generatePurchaseOrder(Integer requestId);

}