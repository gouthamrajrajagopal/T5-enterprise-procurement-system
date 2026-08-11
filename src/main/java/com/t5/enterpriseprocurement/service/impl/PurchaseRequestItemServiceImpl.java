package com.t5.enterpriseprocurement.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.t5.enterpriseprocurement.dto.PurchaseRequestItemDTO;
import com.t5.enterpriseprocurement.dto.PurchaseRequestItemResponseDTO;
import com.t5.enterpriseprocurement.entity.PurchaseRequest;
import com.t5.enterpriseprocurement.entity.PurchaseRequestItem;
import com.t5.enterpriseprocurement.repository.PurchaseRequestItemRepository;
import com.t5.enterpriseprocurement.repository.PurchaseRequestRepository;
import com.t5.enterpriseprocurement.service.PurchaseRequestItemService;
import com.t5.enterpriseprocurement.entity.Supplier;
import com.t5.enterpriseprocurement.repository.SupplierRepository;

@Service
public class PurchaseRequestItemServiceImpl implements PurchaseRequestItemService {

    private final PurchaseRequestRepository purchaseRequestRepository;
    private final PurchaseRequestItemRepository purchaseRequestItemRepository;
    private final SupplierRepository supplierRepository;

    public PurchaseRequestItemServiceImpl(
            PurchaseRequestRepository purchaseRequestRepository,
            PurchaseRequestItemRepository purchaseRequestItemRepository,
            SupplierRepository supplierRepository) {

        this.purchaseRequestRepository = purchaseRequestRepository;
        this.purchaseRequestItemRepository = purchaseRequestItemRepository;
        this.supplierRepository = supplierRepository;
    }

    @Override
    public PurchaseRequestItemResponseDTO createItem(
            Integer requestId,
            PurchaseRequestItemDTO dto) {

        PurchaseRequest purchaseRequest = purchaseRequestRepository
                .findById(requestId)
                .orElseThrow(() ->
                        new IllegalArgumentException("Purchase Request not found"));

        PurchaseRequestItem item = new PurchaseRequestItem();

        item.setPurchaseRequest(purchaseRequest);
        item.setItemName(dto.getItemName());
        item.setDescription(dto.getDescription());
        item.setQuantity(dto.getQuantity());
        item.setUnitPrice(dto.getUnitPrice());

        PurchaseRequestItem savedItem =
                purchaseRequestItemRepository.save(item);

        return convertToResponse(savedItem);
    }

    @Override
    public List<PurchaseRequestItemResponseDTO> getItemsByRequestId(
            Integer requestId) {

        PurchaseRequest purchaseRequest = purchaseRequestRepository
                .findById(requestId)
                .orElseThrow(() ->
                        new IllegalArgumentException("Purchase Request not found"));

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
                        new IllegalArgumentException("Purchase Request Item not found"));

        item.setItemName(dto.getItemName());
        item.setDescription(dto.getDescription());
        item.setQuantity(dto.getQuantity());
        item.setUnitPrice(dto.getUnitPrice());

        PurchaseRequestItem updatedItem =
                purchaseRequestItemRepository.save(item);

        return convertToResponse(updatedItem);
    }

    @Override
    public void deleteItem(Integer itemId) {

        PurchaseRequestItem item = purchaseRequestItemRepository
                .findById(itemId)
                .orElseThrow(() ->
                        new IllegalArgumentException("Purchase Request Item not found"));

        purchaseRequestItemRepository.delete(item);
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
}