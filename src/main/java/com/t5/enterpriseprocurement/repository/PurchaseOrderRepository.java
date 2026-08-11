package com.t5.enterpriseprocurement.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.t5.enterpriseprocurement.entity.PurchaseOrder;

public interface PurchaseOrderRepository
        extends JpaRepository<PurchaseOrder, Integer> {

    Optional<PurchaseOrder> findByPoNumber(String poNumber);

    boolean existsByPurchaseRequestRequestId(Integer requestId);

}