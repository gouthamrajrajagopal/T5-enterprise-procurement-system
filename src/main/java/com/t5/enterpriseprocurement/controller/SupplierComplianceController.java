package com.t5.enterpriseprocurement.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.t5.enterpriseprocurement.entity.SupplierCompliance;
import com.t5.enterpriseprocurement.service.SupplierComplianceService;

@RestController
@RequestMapping("/supplier-compliance")
public class SupplierComplianceController {

    private final SupplierComplianceService supplierComplianceService;

    SupplierComplianceController(SupplierComplianceService supplierComplianceService) {
        this.supplierComplianceService = supplierComplianceService;
    }

    @PostMapping
    public SupplierCompliance saveCompliance(
            @RequestBody SupplierCompliance compliance) {

        return supplierComplianceService.saveCompliance(compliance);
    }

    @GetMapping
    public List<SupplierCompliance> getAllCompliance() {

        return supplierComplianceService.getAllCompliance();
    }

    @GetMapping("/{id}")
    public SupplierCompliance getComplianceById(
            @PathVariable Integer id) {

        return supplierComplianceService.getComplianceById(id);
    }

    @PutMapping("/{id}")
    public SupplierCompliance updateCompliance(
            @PathVariable Integer id,
            @RequestBody SupplierCompliance compliance) {

        return supplierComplianceService.updateCompliance(id, compliance);
    }

    @DeleteMapping("/{id}")
    public String deleteCompliance(
            @PathVariable Integer id) {

        supplierComplianceService.deleteCompliance(id);
        return "Supplier Compliance deleted successfully!";
    }
}