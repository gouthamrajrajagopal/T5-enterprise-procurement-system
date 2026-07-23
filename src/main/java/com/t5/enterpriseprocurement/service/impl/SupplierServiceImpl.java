package com.t5.enterpriseprocurement.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.t5.enterpriseprocurement.entity.Supplier;
import com.t5.enterpriseprocurement.repository.SupplierRepository;
import com.t5.enterpriseprocurement.service.SupplierService;

@Service
public class SupplierServiceImpl implements SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;

    @Override
    public Supplier saveSupplier(Supplier supplier) {
        return supplierRepository.save(supplier);
    }

    @Override
    public List<Supplier> getAllSuppliers() {
        return supplierRepository.findAll();
    }

    @Override
    public Supplier getSupplierById(Integer id) {
        return supplierRepository.findById(id).orElse(null);
    }

    @Override
    public Supplier updateSupplier(Integer id, Supplier supplier) {

        Supplier existingSupplier = supplierRepository.findById(id).orElse(null);

        if (existingSupplier != null) {

            existingSupplier.setSupplierCode(supplier.getSupplierCode());
            existingSupplier.setSupplierName(supplier.getSupplierName());
            existingSupplier.setContactPerson(supplier.getContactPerson());
            existingSupplier.setEmail(supplier.getEmail());
            existingSupplier.setPhone(supplier.getPhone());
            existingSupplier.setAddress(supplier.getAddress());
            existingSupplier.setGstNumber(supplier.getGstNumber());
            existingSupplier.setStatus(supplier.getStatus());
            existingSupplier.setUpdatedAt(supplier.getUpdatedAt());

            return supplierRepository.save(existingSupplier);
        }

        return null;
    }

    @Override
    public void deleteSupplier(Integer id) {
        supplierRepository.deleteById(id);
    }

}