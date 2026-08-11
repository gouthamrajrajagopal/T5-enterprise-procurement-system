package com.t5.enterpriseprocurement.service;

import java.util.List;

import com.t5.enterpriseprocurement.dto.PurchaseRequestDTO;
import com.t5.enterpriseprocurement.dto.PurchaseRequestResponseDTO;

public interface PurchaseRequestService {

    PurchaseRequestResponseDTO createPurchaseRequest(PurchaseRequestDTO requestDTO);

    List<PurchaseRequestResponseDTO> getAllPurchaseRequests();

    PurchaseRequestResponseDTO getPurchaseRequestById(Integer requestId);

    PurchaseRequestResponseDTO updatePurchaseRequest(Integer requestId,
                                                     PurchaseRequestDTO requestDTO);

    void deletePurchaseRequest(Integer requestId);
}