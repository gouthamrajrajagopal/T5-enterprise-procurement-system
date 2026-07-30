package com.t5.enterpriseprocurement.service;

import java.util.List;

import com.t5.enterpriseprocurement.dto.VendorSelectionDTO;
import com.t5.enterpriseprocurement.entity.PurchaseRequest;

public interface VendorSelectionService {

    List<PurchaseRequest> getVendorSelectionPendingRequests();

    PurchaseRequest selectVendor(
            Integer requestId,
            VendorSelectionDTO request
    );
}