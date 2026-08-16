package com.t5.enterpriseprocurement.service.impl;

import java.util.List;
import java.math.BigDecimal;
import java.util.stream.Collectors;
import com.t5.enterpriseprocurement.audit.AuditService;
import org.springframework.stereotype.Service;
import com.t5.enterpriseprocurement.exception.ResourceNotFoundException;
import com.t5.enterpriseprocurement.dto.PurchaseRequestItemDTO;
import com.t5.enterpriseprocurement.dto.PurchaseRequestItemResponseDTO;
import com.t5.enterpriseprocurement.entity.PurchaseRequest;
import com.t5.enterpriseprocurement.entity.PurchaseRequestItem;
import com.t5.enterpriseprocurement.repository.PurchaseRequestItemRepository;
import com.t5.enterpriseprocurement.repository.PurchaseRequestRepository;
import com.t5.enterpriseprocurement.service.PurchaseRequestItemService;
import com.t5.enterpriseprocurement.repository.SupplierRepository;

@Service
public class PurchaseRequestItemServiceImpl implements PurchaseRequestItemService {

    private final PurchaseRequestRepository purchaseRequestRepository;
    private final PurchaseRequestItemRepository purchaseRequestItemRepository;
    private final AuditService auditService;
    
    public PurchaseRequestItemServiceImpl(
            PurchaseRequestRepository purchaseRequestRepository,
            PurchaseRequestItemRepository purchaseRequestItemRepository,
            SupplierRepository supplierRepository,
            AuditService auditService) {
    	this.auditService = auditService;
        this.purchaseRequestRepository = purchaseRequestRepository;
        this.purchaseRequestItemRepository = purchaseRequestItemRepository;
    }

    @Override
    public PurchaseRequestItemResponseDTO createItem(
            Integer requestId,
            PurchaseRequestItemDTO dto) {

        PurchaseRequest purchaseRequest = purchaseRequestRepository
                .findById(requestId)
                .orElseThrow(() ->
                new ResourceNotFoundException("Purchase Request not found."));
        ensureDraft(purchaseRequest);
        PurchaseRequestItem item = new PurchaseRequestItem();

        item.setPurchaseRequest(purchaseRequest);
        item.setItemName(dto.getItemName());
        item.setDescription(dto.getDescription());
        item.setQuantity(dto.getQuantity());
        item.setUnitPrice(dto.getUnitPrice());

        PurchaseRequestItem savedItem =
                purchaseRequestItemRepository.save(item);
        synchronizeRequestTotals(purchaseRequest);

        return convertToResponse(savedItem);
    }

    @Override
    public List<PurchaseRequestItemResponseDTO> getItemsByRequestId(
            Integer requestId) {

        PurchaseRequest purchaseRequest = purchaseRequestRepository
                .findById(requestId)
                .orElseThrow(() ->
                new ResourceNotFoundException("Purchase Request not found."));

        return purchaseRequestItemRepository
                .findByPurchaseRequest(purchaseRequest)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    

    @Override
    public PurchaseRequestItemResponseDTO updateItem(
            Integer itemId,
            PurchaseRequestItemDTO dto) {
    	

        PurchaseRequestItem item = purchaseRequestItemRepository
                .findById(itemId)
                .orElseThrow(() ->
                new ResourceNotFoundException("Purchase Request not found."));

        ensureDraft(item.getPurchaseRequest());

        item.setItemName(dto.getItemName());
        item.setDescription(dto.getDescription());
        item.setQuantity(dto.getQuantity());
        item.setUnitPrice(dto.getUnitPrice());

        PurchaseRequestItem updatedItem =
                purchaseRequestItemRepository.save(item);
        synchronizeRequestTotals(updatedItem.getPurchaseRequest());

        return convertToResponse(updatedItem);
    }

    @Override
    public void deleteItem(Integer itemId) {

        PurchaseRequestItem item = purchaseRequestItemRepository
                .findById(itemId)
                .orElseThrow(() ->
                new ResourceNotFoundException("Purchase Request not found."));
        PurchaseRequest request = item.getPurchaseRequest();
        ensureDraft(request);
        purchaseRequestItemRepository.delete(item);
        synchronizeRequestTotals(request);
    }

    private PurchaseRequestItemResponseDTO convertToResponse(
            PurchaseRequestItem item) {
    	

        PurchaseRequestItemResponseDTO response =
                new PurchaseRequestItemResponseDTO();

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

    private void ensureDraft(PurchaseRequest request) {
        if (!"DRAFT".equals(request.getStatus())) {
            throw new IllegalStateException("Items can only be changed while the request is a draft.");
        }
    }

    private void synchronizeRequestTotals(PurchaseRequest request) {
        List<PurchaseRequestItem> items = purchaseRequestItemRepository.findByPurchaseRequest(request);
        int quantity = items.stream().map(PurchaseRequestItem::getQuantity).filter(value -> value != null).mapToInt(Integer::intValue).sum();
        BigDecimal amount = items.stream().map(PurchaseRequestItem::getTotalPrice).filter(value -> value != null).reduce(BigDecimal.ZERO, BigDecimal::add);
        request.setQuantity(quantity);
        request.setEstimatedAmount(amount);
        purchaseRequestRepository.save(request);
    }
}
