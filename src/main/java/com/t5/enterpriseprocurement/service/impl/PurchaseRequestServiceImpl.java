package com.t5.enterpriseprocurement.service.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.t5.enterpriseprocurement.dto.CreatePurchaseRequestDTO;
import com.t5.enterpriseprocurement.dto.PurchaseRequestItemDTO;
import com.t5.enterpriseprocurement.entity.Category;
import com.t5.enterpriseprocurement.entity.Department;
import com.t5.enterpriseprocurement.entity.PurchaseRequest;
import com.t5.enterpriseprocurement.entity.PurchaseRequestItem;
import com.t5.enterpriseprocurement.entity.User;
import com.t5.enterpriseprocurement.enums.PurchaseRequestStatus;
import com.t5.enterpriseprocurement.repository.CategoryRepository;
import com.t5.enterpriseprocurement.repository.DepartmentRepository;
import com.t5.enterpriseprocurement.repository.PurchaseRequestRepository;
import com.t5.enterpriseprocurement.repository.UserRepository;
import com.t5.enterpriseprocurement.service.PurchaseRequestService;

@Service
public class PurchaseRequestServiceImpl
        implements PurchaseRequestService {

    private static final BigDecimal AUTO_APPROVAL_LIMIT =
            new BigDecimal("10000");

    private static final BigDecimal MANAGER_APPROVAL_LIMIT =
            new BigDecimal("50000");

    private static final BigDecimal FINANCE_APPROVAL_LIMIT =
            new BigDecimal("100000");

    private final PurchaseRequestRepository purchaseRequestRepository;
    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final CategoryRepository categoryRepository;

    public PurchaseRequestServiceImpl(
            PurchaseRequestRepository purchaseRequestRepository,
            UserRepository userRepository,
            DepartmentRepository departmentRepository,
            CategoryRepository categoryRepository) {

        this.purchaseRequestRepository = purchaseRequestRepository;
        this.userRepository = userRepository;
        this.departmentRepository = departmentRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    @Transactional
    public PurchaseRequest createRequest(
            CreatePurchaseRequestDTO request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (!"EMPLOYEE".equalsIgnoreCase(
                user.getRole().getRoleName())) {

            throw new RuntimeException(
                    "Only employees can create purchase requests"
            );
        }

        Department department = departmentRepository
                .findById(request.getDepartmentId())
                .orElseThrow(() ->
                        new RuntimeException("Department not found"));

        PurchaseRequest purchaseRequest = new PurchaseRequest();

        purchaseRequest.setUser(user);
        purchaseRequest.setDepartment(department);
        purchaseRequest.setPurpose(request.getPurpose());

        purchaseRequest.setRequestNumber(
                "PR-" + System.currentTimeMillis()
        );

        List<PurchaseRequestItem> items = new ArrayList<>();

        int totalQuantity = 0;
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (PurchaseRequestItemDTO itemDTO : request.getItems()) {

            Category category = categoryRepository
                    .findById(itemDTO.getCategoryId())
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Category not found"
                            ));

            PurchaseRequestItem item =
                    new PurchaseRequestItem();

            item.setPurchaseRequest(purchaseRequest);
            item.setCategory(category);
            item.setItemName(itemDTO.getItemName());
            item.setItemDescription(
                    itemDTO.getItemDescription()
            );
            item.setQuantity(itemDTO.getQuantity());
            item.setEstimatedPrice(
                    itemDTO.getEstimatedPrice()
            );

            BigDecimal itemTotal =
                    itemDTO.getEstimatedPrice()
                            .multiply(
                                    BigDecimal.valueOf(
                                            itemDTO.getQuantity()
                                    )
                            );

            item.setTotalPrice(itemTotal);

            totalQuantity += itemDTO.getQuantity();
            totalAmount = totalAmount.add(itemTotal);

            items.add(item);
        }

        purchaseRequest.setItems(items);
        purchaseRequest.setTotalQuantity(totalQuantity);
        purchaseRequest.setTotalAmount(totalAmount);

        applyAmountBasedWorkflow(
                purchaseRequest,
                totalAmount
        );

        return purchaseRequestRepository.save(purchaseRequest);
    }

    @Override
    public List<PurchaseRequest> getAllRequests() {
        return purchaseRequestRepository.findAll();
    }

    @Override
    public PurchaseRequest getRequestById(Integer requestId) {

        return purchaseRequestRepository.findById(requestId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Purchase request not found"
                        ));
    }

    @Override
    public List<PurchaseRequest> getRequestsByUser(
            Integer userId) {

        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found");
        }

        return purchaseRequestRepository
                .findByUserUserId(userId);
    }

    @Override
    public List<PurchaseRequest> getPendingRequests() {

        List<PurchaseRequest> pendingRequests =
                new ArrayList<>();

        pendingRequests.addAll(
                purchaseRequestRepository.findByStatus(
                        PurchaseRequestStatus
                                .PENDING_MANAGER_APPROVAL
                )
        );

        pendingRequests.addAll(
                purchaseRequestRepository.findByStatus(
                        PurchaseRequestStatus
                                .PENDING_FINANCE_APPROVAL
                )
        );

        pendingRequests.addAll(
                purchaseRequestRepository.findByStatus(
                        PurchaseRequestStatus
                                .PENDING_OWNER_APPROVAL
                )
        );

        return pendingRequests;
    }

    @Override
    @Transactional
    public PurchaseRequest updateRequest(
            Integer requestId,
            CreatePurchaseRequestDTO request) {

        PurchaseRequest existing =
                getRequestById(requestId);

        if (!isEditableStatus(existing.getStatus())) {

            throw new RuntimeException(
                    "This purchase request can no longer be updated"
            );
        }

        Department department = departmentRepository
                .findById(request.getDepartmentId())
                .orElseThrow(() ->
                        new RuntimeException("Department not found"));

        existing.setDepartment(department);
        existing.setPurpose(request.getPurpose());

        existing.getItems().clear();

        List<PurchaseRequestItem> updatedItems =
                new ArrayList<>();

        int totalQuantity = 0;
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (PurchaseRequestItemDTO itemDTO : request.getItems()) {

            Category category = categoryRepository
                    .findById(itemDTO.getCategoryId())
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Category not found"
                            ));

            PurchaseRequestItem item =
                    new PurchaseRequestItem();

            item.setPurchaseRequest(existing);
            item.setCategory(category);
            item.setItemName(itemDTO.getItemName());
            item.setItemDescription(
                    itemDTO.getItemDescription()
            );
            item.setQuantity(itemDTO.getQuantity());
            item.setEstimatedPrice(
                    itemDTO.getEstimatedPrice()
            );

            BigDecimal itemTotal =
                    itemDTO.getEstimatedPrice()
                            .multiply(
                                    BigDecimal.valueOf(
                                            itemDTO.getQuantity()
                                    )
                            );

            item.setTotalPrice(itemTotal);

            totalQuantity += itemDTO.getQuantity();
            totalAmount = totalAmount.add(itemTotal);

            updatedItems.add(item);
        }

        existing.getItems().addAll(updatedItems);
        existing.setTotalQuantity(totalQuantity);
        existing.setTotalAmount(totalAmount);

        applyAmountBasedWorkflow(existing, totalAmount);

        return purchaseRequestRepository.save(existing);
    }

    @Override
    public void cancelRequest(Integer requestId) {

        PurchaseRequest purchaseRequest =
                getRequestById(requestId);

        if (!isEditableStatus(purchaseRequest.getStatus())) {

            throw new RuntimeException(
                    "Only requests waiting for approval can be cancelled"
            );
        }

        purchaseRequest.setStatus(
                PurchaseRequestStatus.CANCELLED
        );

        purchaseRequestRepository.save(purchaseRequest);
    }

    private void applyAmountBasedWorkflow(
            PurchaseRequest request,
            BigDecimal totalAmount) {

        if (totalAmount.compareTo(AUTO_APPROVAL_LIMIT) <= 0) {

            request.setStatus(
                    PurchaseRequestStatus
                            .VENDOR_SELECTION_PENDING
            );

            request.setCurrentApprovalLevel(0);

        } else if (
                totalAmount.compareTo(
                        MANAGER_APPROVAL_LIMIT
                ) <= 0) {

            request.setStatus(
                    PurchaseRequestStatus
                            .PENDING_MANAGER_APPROVAL
            );

            request.setCurrentApprovalLevel(1);

        } else if (
                totalAmount.compareTo(
                        FINANCE_APPROVAL_LIMIT
                ) <= 0) {

            request.setStatus(
                    PurchaseRequestStatus
                            .PENDING_FINANCE_APPROVAL
            );

            request.setCurrentApprovalLevel(1);

        } else {

            request.setStatus(
                    PurchaseRequestStatus
                            .PENDING_OWNER_APPROVAL
            );

            request.setCurrentApprovalLevel(1);
        }
    }

    private boolean isEditableStatus(
            PurchaseRequestStatus status) {

        return status
                == PurchaseRequestStatus
                .PENDING_MANAGER_APPROVAL
                ||
                status
                        == PurchaseRequestStatus
                        .PENDING_FINANCE_APPROVAL
                ||
                status
                        == PurchaseRequestStatus
                        .PENDING_OWNER_APPROVAL;
    }
}