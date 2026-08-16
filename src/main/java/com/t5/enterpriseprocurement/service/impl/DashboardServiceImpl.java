package com.t5.enterpriseprocurement.service.impl;

import org.springframework.stereotype.Service;

import com.t5.enterpriseprocurement.dto.DashboardResponseDTO;
import com.t5.enterpriseprocurement.service.DashboardService;
import com.t5.enterpriseprocurement.repository.DepartmentRepository;
import com.t5.enterpriseprocurement.repository.PurchaseOrderRepository;
import com.t5.enterpriseprocurement.repository.PurchaseRequestRepository;
import com.t5.enterpriseprocurement.repository.SupplierRepository;

@Service
public class DashboardServiceImpl implements DashboardService {
	private final PurchaseRequestRepository purchaseRequestRepository;
	private final PurchaseOrderRepository purchaseOrderRepository;
	private final SupplierRepository supplierRepository;
	private final DepartmentRepository departmentRepository;
	
	public DashboardServiceImpl(
	        PurchaseRequestRepository purchaseRequestRepository,
	        PurchaseOrderRepository purchaseOrderRepository,
	        SupplierRepository supplierRepository,
	        DepartmentRepository departmentRepository) {

	    this.purchaseRequestRepository = purchaseRequestRepository;
	    this.purchaseOrderRepository = purchaseOrderRepository;
	    this.supplierRepository = supplierRepository;
	    this.departmentRepository = departmentRepository;
	}

    @Override
    public DashboardResponseDTO getDashboardSummary() {
    	

        DashboardResponseDTO response = new DashboardResponseDTO();

        response.setTotalRequests(
                purchaseRequestRepository.count());
        response.setPendingRequests(
                purchaseRequestRepository.countByStatusContaining("PENDING"));
        long approvedRequests =
                purchaseRequestRepository.countByStatus("APPROVED")
              + purchaseRequestRepository.countByStatus("PO_GENERATED")
              + purchaseRequestRepository.countByStatus("VENDOR_SELECTED");

        response.setApprovedRequests(approvedRequests);
        response.setPurchaseOrders(
                purchaseOrderRepository.count());
        response.setTotalSpend(
                purchaseOrderRepository.getTotalSpend());
        response.setTotalSuppliers(
                supplierRepository.count());
        response.setTotalDepartments(
                departmentRepository.count());

        return response;
    }
}
