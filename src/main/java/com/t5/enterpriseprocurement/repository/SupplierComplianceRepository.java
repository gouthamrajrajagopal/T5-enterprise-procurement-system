package com.t5.enterpriseprocurement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.t5.enterpriseprocurement.entity.SupplierCompliance;

public interface SupplierComplianceRepository
        extends JpaRepository<SupplierCompliance, Integer> {

}