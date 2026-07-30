package com.t5.enterpriseprocurement.service;

import java.util.List;

import com.t5.enterpriseprocurement.dto.CreatePurchaseRequestDTO;
import com.t5.enterpriseprocurement.entity.PurchaseRequest;

public interface PurchaseRequestService {

    PurchaseRequest createRequest(CreatePurchaseRequestDTO request);

    List<PurchaseRequest> getAllRequests();

    PurchaseRequest getRequestById(Integer requestId);

    List<PurchaseRequest> getRequestsByUser(Integer userId);

    List<PurchaseRequest> getPendingRequests();

    PurchaseRequest updateRequest(
            Integer requestId,
            CreatePurchaseRequestDTO request
    );

    void cancelRequest(Integer requestId);
}