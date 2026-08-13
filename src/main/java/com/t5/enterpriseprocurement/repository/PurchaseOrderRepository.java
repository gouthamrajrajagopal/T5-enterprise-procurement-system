package com.t5.enterpriseprocurement.repository;
import java.math.BigDecimal;
import java.math.BigDecimal;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Query;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.t5.enterpriseprocurement.entity.PurchaseOrder;

public interface PurchaseOrderRepository
        extends JpaRepository<PurchaseOrder, Integer> {
	
	@Query("SELECT COALESCE(SUM(p.totalAmount), 0) FROM PurchaseOrder p")
	BigDecimal getTotalSpend();

    Optional<PurchaseOrder> findByPoNumber(String poNumber);

    boolean existsByPurchaseRequestRequestId(Integer requestId);

}