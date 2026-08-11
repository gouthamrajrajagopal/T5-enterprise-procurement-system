package com.t5.enterpriseprocurement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.t5.enterpriseprocurement.entity.PurchaseRequest;
import com.t5.enterpriseprocurement.entity.PurchaseRequestItem;

public interface PurchaseRequestItemRepository
        extends JpaRepository<PurchaseRequestItem, Integer> {

    List<PurchaseRequestItem> findByPurchaseRequest(PurchaseRequest purchaseRequest);

}