package com.t5.enterpriseprocurement.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.t5.enterpriseprocurement.dto.VendorSelectionDTO;
import com.t5.enterpriseprocurement.entity.PurchaseRequest;
import com.t5.enterpriseprocurement.entity.Supplier;
import com.t5.enterpriseprocurement.entity.User;
import com.t5.enterpriseprocurement.enums.PurchaseRequestStatus;
import com.t5.enterpriseprocurement.repository.PurchaseRequestRepository;
import com.t5.enterpriseprocurement.repository.SupplierRepository;
import com.t5.enterpriseprocurement.repository.UserRepository;
import com.t5.enterpriseprocurement.service.VendorSelectionService;

@Service
public class VendorSelectionServiceImpl
        implements VendorSelectionService {

    private final PurchaseRequestRepository purchaseRequestRepository;
    private final SupplierRepository supplierRepository;
    private final UserRepository userRepository;

    public VendorSelectionServiceImpl(
            PurchaseRequestRepository purchaseRequestRepository,
            SupplierRepository supplierRepository,
            UserRepository userRepository) {

        this.purchaseRequestRepository = purchaseRequestRepository;
        this.supplierRepository = supplierRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<PurchaseRequest>
    getVendorSelectionPendingRequests() {

        return purchaseRequestRepository.findByStatus(
                PurchaseRequestStatus.VENDOR_SELECTION_PENDING
        );
    }

    @Override
    @Transactional
    public PurchaseRequest selectVendor(
            Integer requestId,
            VendorSelectionDTO selection) {

        PurchaseRequest request =
                purchaseRequestRepository.findById(requestId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Purchase request not found"
                                ));

        if (request.getStatus()
                != PurchaseRequestStatus
                .VENDOR_SELECTION_PENDING) {

            throw new RuntimeException(
                    "Request is not ready for vendor selection"
            );
        }

        User selectedBy =
                userRepository.findById(
                        selection.getSelectedByUserId()
                ).orElseThrow(() ->
                        new RuntimeException(
                                "Selecting user not found"
                        ));

        String role =
                selectedBy.getRole().getRoleName();

        if (!"ADMIN".equalsIgnoreCase(role)
                && !"FINANCE".equalsIgnoreCase(role)) {

            throw new RuntimeException(
                    "Only ADMIN or FINANCE can select a vendor"
            );
        }

        Supplier supplier =
                supplierRepository.findById(
                        selection.getSupplierId()
                ).orElseThrow(() ->
                        new RuntimeException(
                                "Supplier not found"
                        ));

        if (!"ACTIVE".equalsIgnoreCase(
                supplier.getStatus())) {

            throw new RuntimeException(
                    "Only active suppliers can be selected"
            );
        }

        request.setSelectedSupplier(supplier);
        request.setStatus(
                PurchaseRequestStatus.VENDOR_SELECTED
        );

        return purchaseRequestRepository.save(request);
    }
}