package com.t5.enterpriseprocurement.service;

import com.t5.enterpriseprocurement.dto.PurchaseOrderResponseDTO;
import java.util.List;

public interface PurchaseOrderService {

    PurchaseOrderResponseDTO generatePurchaseOrder(Integer requestId);
    List<PurchaseOrderResponseDTO> getPurchaseOrders();
    PurchaseOrderResponseDTO getPurchaseOrderById(Integer poId);

}
