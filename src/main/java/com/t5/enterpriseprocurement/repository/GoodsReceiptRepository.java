package com.t5.enterpriseprocurement.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.t5.enterpriseprocurement.entity.GoodsReceipt;

public interface GoodsReceiptRepository
        extends JpaRepository<GoodsReceipt, Integer> {

    Optional<GoodsReceipt> findByPurchaseOrderPoId(Integer poId);

    boolean existsByPurchaseOrderPoId(Integer poId);
}