package com.t5.enterpriseprocurement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.t5.enterpriseprocurement.entity.PurchaseRequestItem;

public interface PurchaseRequestItemRepository
        extends JpaRepository<PurchaseRequestItem, Integer> {
}