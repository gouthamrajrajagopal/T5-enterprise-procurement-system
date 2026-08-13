package com.t5.enterpriseprocurement.repository;
import java.math.BigDecimal;
import java.math.BigDecimal;
import java.math.BigDecimal;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.math.BigDecimal;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Query;
import java.util.Optional;
import java.math.BigDecimal;
import java.math.BigDecimal;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.data.jpa.repository.JpaRepository;
import com.t5.enterpriseprocurement.entity.PurchaseOrder;

public interface PurchaseOrderRepository
        extends JpaRepository<PurchaseOrder, Integer> {
	
	@Query("SELECT COALESCE(SUM(p.totalAmount), 0) FROM PurchaseOrder p")
	BigDecimal getTotalSpend();

    Optional<PurchaseOrder> findByPoNumber(String poNumber);

    boolean existsByPurchaseRequestRequestId(Integer requestId);

    
    @Query("""
    		SELECT COUNT(po)
    		FROM PurchaseOrder po
    		WHERE po.supplier.supplierId = :supplierId
    		""")
    		Long countBySupplier(@Param("supplierId") Integer supplierId);
    
    @Query("""
    		SELECT COALESCE(SUM(po.totalAmount),0)
    		FROM PurchaseOrder po
    		WHERE po.supplier.supplierId = :supplierId
    		""")
    		BigDecimal getSupplierBusiness(@Param("supplierId") Integer supplierId);
    
    @Query("""
    		SELECT COUNT(po)
    		FROM PurchaseOrder po
    		WHERE FUNCTION('YEAR', po.createdAt) = :year
    		AND FUNCTION('MONTH', po.createdAt) = :month
    		""")
    		Long countMonthlyPurchaseOrders(
    		        @Param("year") int year,
    		        @Param("month") int month);
    
    @Query("""
    		SELECT COALESCE(SUM(po.totalAmount),0)
    		FROM PurchaseOrder po
    		WHERE FUNCTION('YEAR', po.createdAt) = :year
    		AND FUNCTION('MONTH', po.createdAt) = :month
    		""")
    		BigDecimal getMonthlySpend(
    		        @Param("year") int year,
    		        @Param("month") int month);
    
    @Query("""
    		SELECT COUNT(po)
    		FROM PurchaseOrder po
    		WHERE po.purchaseRequest.department.deptId = :deptId
    		""")
    		Long countPurchaseOrdersByDepartment(
    		        @Param("deptId") Integer deptId);
    
    @Query("""
    		SELECT COALESCE(SUM(po.totalAmount),0)
    		FROM PurchaseOrder po
    		WHERE po.purchaseRequest.department.deptId = :deptId
    		""")
    		BigDecimal getDepartmentSpend(
    		        @Param("deptId") Integer deptId);

}