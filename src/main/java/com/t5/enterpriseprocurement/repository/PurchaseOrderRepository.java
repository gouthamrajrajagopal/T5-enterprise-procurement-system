package com.t5.enterpriseprocurement.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.t5.enterpriseprocurement.entity.PurchaseOrder;
import com.t5.enterpriseprocurement.enums.PurchaseOrderStatus;

public interface PurchaseOrderRepository
        extends JpaRepository<PurchaseOrder, Integer> {

    Optional<PurchaseOrder>
    findByPurchaseRequestRequestId(Integer requestId);

    boolean existsByPurchaseRequestRequestId(Integer requestId);

    List<PurchaseOrder>
    findBySupplierSupplierId(Integer supplierId);

    List<PurchaseOrder>
    findByStatus(PurchaseOrderStatus status);
}