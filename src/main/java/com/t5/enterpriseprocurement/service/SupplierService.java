package com.t5.enterpriseprocurement.service;

import java.util.List;

import com.t5.enterpriseprocurement.entity.Supplier;

public interface SupplierService {

    Supplier saveSupplier(Supplier supplier);

    List<Supplier> getAllSuppliers();

    Supplier getSupplierById(Integer id);

    Supplier updateSupplier(Integer id, Supplier supplier);

    void deleteSupplier(Integer id);
}