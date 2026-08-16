package com.t5.enterpriseprocurement.service.impl;

import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import com.t5.enterpriseprocurement.dto.PurchaseOrderResponseDTO;
import com.t5.enterpriseprocurement.dto.PurchaseRequestItemResponseDTO;
import com.t5.enterpriseprocurement.entity.PurchaseOrder;
import com.t5.enterpriseprocurement.entity.PurchaseRequest;
import com.t5.enterpriseprocurement.repository.PurchaseOrderRepository;
import com.t5.enterpriseprocurement.repository.PurchaseRequestRepository;
import com.t5.enterpriseprocurement.repository.PurchaseRequestItemRepository;
import com.t5.enterpriseprocurement.entity.PurchaseRequestItem;
import com.t5.enterpriseprocurement.exception.ResourceNotFoundException;
import com.t5.enterpriseprocurement.service.PurchaseOrderService;

@Service
public class PurchaseOrderServiceImpl
        implements PurchaseOrderService {
	
	private final PurchaseOrderRepository purchaseOrderRepository;

	private final PurchaseRequestRepository purchaseRequestRepository;
	private final PurchaseRequestItemRepository purchaseRequestItemRepository;
	
	public PurchaseOrderServiceImpl(
	        PurchaseOrderRepository purchaseOrderRepository,
	        PurchaseRequestRepository purchaseRequestRepository,
	        PurchaseRequestItemRepository purchaseRequestItemRepository) {

	    this.purchaseOrderRepository = purchaseOrderRepository;
	    this.purchaseRequestRepository = purchaseRequestRepository;
	    this.purchaseRequestItemRepository = purchaseRequestItemRepository;
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

		    return toResponse(saved);
		}

    @Override
    public List<PurchaseOrderResponseDTO> getPurchaseOrders() {
        return purchaseOrderRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public PurchaseOrderResponseDTO getPurchaseOrderById(Integer poId) {
        return toResponse(purchaseOrderRepository.findById(poId)
                .orElseThrow(() -> new ResourceNotFoundException("Purchase Order not found.")));
    }

    private PurchaseOrderResponseDTO toResponse(PurchaseOrder purchaseOrder) {
        PurchaseRequest request = purchaseOrder.getPurchaseRequest();
        PurchaseOrderResponseDTO response = new PurchaseOrderResponseDTO();
        response.setPoId(purchaseOrder.getPoId());
        response.setPoNumber(purchaseOrder.getPoNumber());
        response.setRequestId(request.getRequestId());
        response.setRequestNumber(request.getRequestNumber());
        response.setSupplierId(purchaseOrder.getSupplier().getSupplierId());
        response.setSupplierName(purchaseOrder.getSupplier().getSupplierName());
        response.setDepartmentName(request.getDepartment().getDeptName());
        response.setTotalAmount(purchaseOrder.getTotalAmount());
        response.setStatus(purchaseOrder.getStatus());
        response.setCreatedAt(purchaseOrder.getCreatedAt());
        response.setItems(purchaseRequestItemRepository.findByPurchaseRequest(request).stream()
                .map(this::toItemResponse).collect(Collectors.toList()));
        return response;
    }

    private PurchaseRequestItemResponseDTO toItemResponse(PurchaseRequestItem item) {
        PurchaseRequestItemResponseDTO response = new PurchaseRequestItemResponseDTO();
        response.setItemId(item.getItemId());
        response.setItemName(item.getItemName());
        response.setDescription(item.getDescription());
        response.setQuantity(item.getQuantity());
        response.setUnitPrice(item.getUnitPrice());
        response.setTotalPrice(item.getTotalPrice());
        response.setStatus(item.getStatus());
        response.setCreatedAt(item.getCreatedAt());
        return response;
    }

	}
