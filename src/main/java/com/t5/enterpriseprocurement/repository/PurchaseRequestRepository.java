package com.t5.enterpriseprocurement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.t5.enterpriseprocurement.entity.PurchaseRequest;
import com.t5.enterpriseprocurement.enums.PurchaseRequestStatus;

public interface PurchaseRequestRepository
        extends JpaRepository<PurchaseRequest, Integer> {

    List<PurchaseRequest> findByUserUserId(Integer userId);

    List<PurchaseRequest> findByStatus(
            PurchaseRequestStatus status
    );
}