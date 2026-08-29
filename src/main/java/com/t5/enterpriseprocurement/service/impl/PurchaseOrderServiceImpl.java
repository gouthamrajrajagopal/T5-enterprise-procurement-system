package com.t5.enterpriseprocurement.service.impl;

import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import com.t5.enterpriseprocurement.dto.PurchaseOrderResponseDTO;
import com.t5.enterpriseprocurement.entity.PurchaseOrder;
import com.t5.enterpriseprocurement.entity.PurchaseRequest;
import com.t5.enterpriseprocurement.repository.PurchaseOrderRepository;
import com.t5.enterpriseprocurement.repository.PurchaseRequestRepository;
import com.t5.enterpriseprocurement.service.PurchaseOrderService;

@Service
public class PurchaseOrderServiceImpl
        implements PurchaseOrderService {
	
	private final PurchaseOrderRepository purchaseOrderRepository;

	private final PurchaseRequestRepository purchaseRequestRepository;
	
	public PurchaseOrderServiceImpl(
	        PurchaseOrderRepository purchaseOrderRepository,
	        PurchaseRequestRepository purchaseRequestRepository) {

	    this.purchaseOrderRepository = purchaseOrderRepository;
	    this.purchaseRequestRepository = purchaseRequestRepository;
	}
	
	private String generatePONumber() {

	    return "PO-" + System.currentTimeMillis();

	}
	
	@Override
	public PurchaseOrderResponseDTO generatePurchaseOrder(Integer requestId) {

		    PurchaseRequest request = purchaseRequestRepository.findById(requestId)
		            .orElseThrow(() ->
		                    new RuntimeException("Purchase Request not found"));

		    if (!"VENDOR_SELECTED".equals(request.getStatus())) {
		        throw new RuntimeException(
		                "Purchase Request is not ready for Purchase Order generation");
		    }

		    if (purchaseOrderRepository
		            .existsByPurchaseRequestRequestId(requestId)) {

		        throw new RuntimeException(
		                "Purchase Order already exists");
		    }

		    PurchaseOrder purchaseOrder = new PurchaseOrder();

		    purchaseOrder.setPoNumber(generatePONumber());
		    purchaseOrder.setPurchaseRequest(request);
		    purchaseOrder.setSupplier(request.getSupplier());
		    purchaseOrder.setTotalAmount(request.getEstimatedAmount());
		    purchaseOrder.setStatus("CREATED");
		    purchaseOrder.setCreatedAt(LocalDateTime.now());
		    purchaseOrder.setUpdatedAt(LocalDateTime.now());

		    PurchaseOrder saved =
		            purchaseOrderRepository.save(purchaseOrder);

		    request.setStatus("PO_GENERATED");
		    purchaseRequestRepository.save(request);

		    PurchaseOrderResponseDTO response =
		            new PurchaseOrderResponseDTO();

		    response.setPoId(saved.getPoId());
		    response.setPoNumber(saved.getPoNumber());
		    response.setRequestNumber(
		            request.getRequestNumber());
		    response.setSupplierName(
		            request.getSupplier().getSupplierName());
		    response.setTotalAmount(
		            saved.getTotalAmount());
		    response.setStatus(saved.getStatus());
		    response.setCreatedAt(saved.getCreatedAt());

		    return response;
		}

	}