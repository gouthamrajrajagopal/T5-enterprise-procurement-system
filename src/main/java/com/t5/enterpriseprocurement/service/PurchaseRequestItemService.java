package com.t5.enterpriseprocurement.service;

import java.util.List;

import com.t5.enterpriseprocurement.dto.PurchaseRequestItemDTO;
import com.t5.enterpriseprocurement.dto.PurchaseRequestItemResponseDTO;

public interface PurchaseRequestItemService {

    PurchaseRequestItemResponseDTO createItem(
            Integer requestId,
            PurchaseRequestItemDTO dto);

    List<PurchaseRequestItemResponseDTO> getItemsByRequestId(
            Integer requestId);

    PurchaseRequestItemResponseDTO updateItem(
            Integer itemId,
            PurchaseRequestItemDTO dto);

    void deleteItem(Integer itemId);

}