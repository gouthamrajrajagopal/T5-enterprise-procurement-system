package com.t5.enterpriseprocurement.service;

import java.util.List;

import com.t5.enterpriseprocurement.entity.SupplierCompliance;

public interface SupplierComplianceService {

    SupplierCompliance saveCompliance(SupplierCompliance compliance);

    List<SupplierCompliance> getAllCompliance();

    SupplierCompliance getComplianceById(Integer id);

    SupplierCompliance updateCompliance(Integer id,
                                        SupplierCompliance compliance);

    void deleteCompliance(Integer id);
}