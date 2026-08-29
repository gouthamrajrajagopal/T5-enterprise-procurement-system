package com.t5.enterpriseprocurement.service.impl;

import java.util.List;
import org.springframework.stereotype.Service;
import com.t5.enterpriseprocurement.entity.SupplierCompliance;
import com.t5.enterpriseprocurement.repository.SupplierComplianceRepository;
import com.t5.enterpriseprocurement.service.SupplierComplianceService;

@Service
public class SupplierComplianceServiceImpl
        implements SupplierComplianceService {

    private final SupplierComplianceRepository supplierComplianceRepository;

    SupplierComplianceServiceImpl(SupplierComplianceRepository supplierComplianceRepository) {
        this.supplierComplianceRepository = supplierComplianceRepository;
    }

    @Override
    public SupplierCompliance saveCompliance(SupplierCompliance compliance) {
        return supplierComplianceRepository.save(compliance);
    }

    @Override
    public List<SupplierCompliance> getAllCompliance() {
        return supplierComplianceRepository.findAll();
    }

    @Override
    public SupplierCompliance getComplianceById(Integer id) {
        return supplierComplianceRepository.findById(id).orElse(null);
    }

    @Override
    public SupplierCompliance updateCompliance(Integer id,
                                               SupplierCompliance compliance) {

        SupplierCompliance existingCompliance =
                supplierComplianceRepository.findById(id).orElse(null);

        if (existingCompliance != null) {

            existingCompliance.setSupplier(compliance.getSupplier());
            existingCompliance.setGstVerified(compliance.getGstVerified());
            existingCompliance.setPanVerified(compliance.getPanVerified());
            existingCompliance.setIsoCertified(compliance.getIsoCertified());
            existingCompliance.setLicenseExpiry(compliance.getLicenseExpiry());
            existingCompliance.setComplianceStatus(compliance.getComplianceStatus());
            existingCompliance.setUpdatedAt(compliance.getUpdatedAt());

            return supplierComplianceRepository.save(existingCompliance);
        }

        return null;
    }

    @Override
    public void deleteCompliance(Integer id) {
        supplierComplianceRepository.deleteById(id);
    }
}