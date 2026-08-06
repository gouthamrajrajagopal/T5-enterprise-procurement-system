package com.t5.enterpriseprocurement.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.t5.enterpriseprocurement.dto.ApprovalActionDTO;
import com.t5.enterpriseprocurement.entity.Approval;
import com.t5.enterpriseprocurement.entity.PurchaseRequest;
import com.t5.enterpriseprocurement.entity.User;
import com.t5.enterpriseprocurement.enums.ApprovalStatus;
import com.t5.enterpriseprocurement.enums.PurchaseRequestStatus;
import com.t5.enterpriseprocurement.repository.ApprovalRepository;
import com.t5.enterpriseprocurement.repository.PurchaseRequestRepository;
import com.t5.enterpriseprocurement.repository.UserRepository;
import com.t5.enterpriseprocurement.service.ApprovalService;

@Service
public class ApprovalServiceImpl implements ApprovalService {

    private final PurchaseRequestRepository purchaseRequestRepository;
    private final ApprovalRepository approvalRepository;
    private final UserRepository userRepository;

    public ApprovalServiceImpl(
            PurchaseRequestRepository purchaseRequestRepository,
            ApprovalRepository approvalRepository,
            UserRepository userRepository) {

        this.purchaseRequestRepository =
                purchaseRequestRepository;

        this.approvalRepository =
                approvalRepository;

        this.userRepository =
                userRepository;
    }

    /* =========================================================
                       MANAGER
       ========================================================= */

    @Override
    @Transactional(readOnly = true)
    public List<PurchaseRequest> getManagerPendingRequests() {

        List<PurchaseRequest> requests =
                purchaseRequestRepository.findByStatus(
                        PurchaseRequestStatus
                                .PENDING_MANAGER_APPROVAL
                );

        requests.forEach(
                this::initializePurchaseRequest
        );

        return requests;
    }

    @Override
    @Transactional
    public PurchaseRequest managerApprove(
            Integer requestId,
            ApprovalActionDTO action) {

        PurchaseRequest request =
                getRequest(requestId);

        User manager = getApprover(
                action.getApproverId(),
                "MANAGER"
        );

        validateRequestStatus(
                request,
                PurchaseRequestStatus
                        .PENDING_MANAGER_APPROVAL,
                "Request is not pending manager approval"
        );

        saveApproval(
                requestId,
                manager,
                1,
                ApprovalStatus.APPROVED,
                action.getRemarks()
        );

        /*
         * Business rule:
         * Manager handles only ₹10,001–₹50,000 requests.
         * After Manager approval, send directly to Procurement.
         */
        request.setStatus(
                PurchaseRequestStatus
                        .VENDOR_SELECTION_PENDING
        );

        request.setCurrentApprovalLevel(0);

        PurchaseRequest savedRequest =
                purchaseRequestRepository.save(request);

        initializePurchaseRequest(savedRequest);

        return savedRequest;
    }

    @Override
    @Transactional
    public PurchaseRequest managerReject(
            Integer requestId,
            ApprovalActionDTO action) {

        PurchaseRequest request =
                getRequest(requestId);

        User manager = getApprover(
                action.getApproverId(),
                "MANAGER"
        );

        validateRequestStatus(
                request,
                PurchaseRequestStatus
                        .PENDING_MANAGER_APPROVAL,
                "Request is not pending manager approval"
        );

        validateRejectionRemarks(
                action.getRemarks()
        );

        saveApproval(
                requestId,
                manager,
                1,
                ApprovalStatus.REJECTED,
                action.getRemarks()
        );

        request.setStatus(
                PurchaseRequestStatus.REJECTED
        );

        request.setCurrentApprovalLevel(0);

        PurchaseRequest savedRequest =
                purchaseRequestRepository.save(request);

        initializePurchaseRequest(savedRequest);

        return savedRequest;
    }

    /* =========================================================
                       FINANCE
       ========================================================= */

    @Override
    @Transactional(readOnly = true)
    public List<PurchaseRequest> getFinancePendingRequests() {

        List<PurchaseRequest> requests =
                purchaseRequestRepository.findByStatus(
                        PurchaseRequestStatus
                                .PENDING_FINANCE_APPROVAL
                );

        requests.forEach(
                this::initializePurchaseRequest
        );

        return requests;
    }

    @Override
    @Transactional
    public PurchaseRequest financeApprove(
            Integer requestId,
            ApprovalActionDTO action) {

        PurchaseRequest request =
                getRequest(requestId);

        User finance = getApprover(
                action.getApproverId(),
                "FINANCE"
        );

        validateRequestStatus(
                request,
                PurchaseRequestStatus
                        .PENDING_FINANCE_APPROVAL,
                "Request is not pending finance approval"
        );

        saveApproval(
                requestId,
                finance,
                2,
                ApprovalStatus.APPROVED,
                action.getRemarks()
        );

        /*
         * Business rule:
         * Finance handles only ₹50,001–₹1,00,000 requests.
         * After Finance approval, send directly to Procurement.
         */
        request.setStatus(
                PurchaseRequestStatus
                        .VENDOR_SELECTION_PENDING
        );

        request.setCurrentApprovalLevel(0);

        PurchaseRequest savedRequest =
                purchaseRequestRepository.save(request);

        initializePurchaseRequest(savedRequest);

        return savedRequest;
    }

    @Override
    @Transactional
    public PurchaseRequest financeReject(
            Integer requestId,
            ApprovalActionDTO action) {

        PurchaseRequest request =
                getRequest(requestId);

        User finance = getApprover(
                action.getApproverId(),
                "FINANCE"
        );

        validateRequestStatus(
                request,
                PurchaseRequestStatus
                        .PENDING_FINANCE_APPROVAL,
                "Request is not pending finance approval"
        );

        validateRejectionRemarks(
                action.getRemarks()
        );

        saveApproval(
                requestId,
                finance,
                2,
                ApprovalStatus.REJECTED,
                action.getRemarks()
        );

        request.setStatus(
                PurchaseRequestStatus.REJECTED
        );

        request.setCurrentApprovalLevel(0);

        PurchaseRequest savedRequest =
                purchaseRequestRepository.save(request);

        initializePurchaseRequest(savedRequest);

        return savedRequest;
    }

    /* =========================================================
                  OWNER / DIRECTOR
       ========================================================= */

    @Override
    @Transactional(readOnly = true)
    public List<PurchaseRequest> getOwnerPendingRequests() {

        List<PurchaseRequest> requests =
                purchaseRequestRepository.findByStatus(
                        PurchaseRequestStatus
                                .PENDING_OWNER_APPROVAL
                );

        requests.forEach(
                this::initializePurchaseRequest
        );

        return requests;
    }

    @Override
    @Transactional
    public PurchaseRequest ownerApprove(
            Integer requestId,
            ApprovalActionDTO action) {

        PurchaseRequest request =
                getRequest(requestId);

        User owner = getApprover(
                action.getApproverId(),
                "OWNER"
        );

        validateRequestStatus(
                request,
                PurchaseRequestStatus
                        .PENDING_OWNER_APPROVAL,
                "Request is not pending owner approval"
        );

        saveApproval(
                requestId,
                owner,
                3,
                ApprovalStatus.APPROVED,
                action.getRemarks()
        );

        /*
         * Business rule:
         * Owner/Director handles requests above ₹1,00,000.
         * After approval, send directly to Procurement.
         */
        request.setStatus(
                PurchaseRequestStatus
                        .VENDOR_SELECTION_PENDING
        );

        request.setCurrentApprovalLevel(0);

        PurchaseRequest savedRequest =
                purchaseRequestRepository.save(request);

        initializePurchaseRequest(savedRequest);

        return savedRequest;
    }

    @Override
    @Transactional
    public PurchaseRequest ownerReject(
            Integer requestId,
            ApprovalActionDTO action) {

        PurchaseRequest request =
                getRequest(requestId);

        User owner = getApprover(
                action.getApproverId(),
                "OWNER"
        );

        validateRequestStatus(
                request,
                PurchaseRequestStatus
                        .PENDING_OWNER_APPROVAL,
                "Request is not pending owner approval"
        );

        validateRejectionRemarks(
                action.getRemarks()
        );

        saveApproval(
                requestId,
                owner,
                3,
                ApprovalStatus.REJECTED,
                action.getRemarks()
        );

        request.setStatus(
                PurchaseRequestStatus.REJECTED
        );

        request.setCurrentApprovalLevel(0);

        PurchaseRequest savedRequest =
                purchaseRequestRepository.save(request);

        initializePurchaseRequest(savedRequest);

        return savedRequest;
    }

    /* =========================================================
                    APPROVAL HISTORY
       ========================================================= */

    @Override
    @Transactional(readOnly = true)
    public List<Approval> getApprovalHistory(
            Integer requestId) {

        if (!purchaseRequestRepository
                .existsById(requestId)) {

            throw new RuntimeException(
                    "Purchase request not found with ID: "
                            + requestId
            );
        }

        return approvalRepository
                .findByRequestId(requestId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Approval> getApproverHistory(
            Integer approverId) {

        if (!userRepository.existsById(approverId)) {

            throw new RuntimeException(
                    "Approver not found with ID: "
                            + approverId
            );
        }

        return approvalRepository
                .findByApproverId(approverId);
    }

    /* =========================================================
                    DASHBOARD COUNTS
       ========================================================= */

    @Override
    @Transactional(readOnly = true)
    public long getApprovedCount(
            Integer approverId) {

        return approvalRepository
                .countByApproverIdAndStatus(
                        approverId,
                        ApprovalStatus.APPROVED
                );
    }

    @Override
    @Transactional(readOnly = true)
    public long getRejectedCount(
            Integer approverId) {

        return approvalRepository
                .countByApproverIdAndStatus(
                        approverId,
                        ApprovalStatus.REJECTED
                );
    }

    /* =========================================================
                    PRIVATE HELPERS
       ========================================================= */

    private PurchaseRequest getRequest(
            Integer requestId) {

        PurchaseRequest request =
                purchaseRequestRepository
                        .findById(requestId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Purchase request not found with ID: "
                                                + requestId
                                )
                        );

        initializePurchaseRequest(request);

        return request;
    }

    private User getApprover(
            Integer approverId,
            String requiredRole) {

        User user = userRepository
                .findById(approverId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Approver not found with ID: "
                                        + approverId
                        )
                );

        if (user.getRole() == null) {

            throw new RuntimeException(
                    "Approver does not have a role"
            );
        }

        if (!requiredRole.equalsIgnoreCase(
                user.getRole().getRoleName()
        )) {

            throw new RuntimeException(
                    "Only a "
                            + requiredRole
                            + " can perform this action"
            );
        }

        if (!"ACTIVE".equalsIgnoreCase(
                user.getStatus()
        )) {

            throw new RuntimeException(
                    "Approver account is inactive"
            );
        }

        return user;
    }

    private void saveApproval(
            Integer requestId,
            User approver,
            Integer level,
            ApprovalStatus status,
            String remarks) {

        Approval approval = new Approval();

        approval.setRequestId(requestId);

        approval.setApproverId(
                approver.getUserId()
        );

        approval.setApprovalLevel(level);

        approval.setApproverRole(
                approver.getRole().getRoleName()
        );

        approval.setStatus(status);
        approval.setRemarks(remarks);

        approvalRepository.save(approval);
    }

    private void validateRequestStatus(
            PurchaseRequest request,
            PurchaseRequestStatus expectedStatus,
            String message) {

        if (request.getStatus() != expectedStatus) {

            throw new RuntimeException(message);
        }
    }

    private void validateRejectionRemarks(
            String remarks) {

        if (remarks == null ||
                remarks.isBlank()) {

            throw new RuntimeException(
                    "Remarks are required when rejecting a request"
            );
        }
    }

    /**
     * Initializes lazy-loaded relationships while the transaction
     * is active, preventing JSON serialization errors.
     */
    private void initializePurchaseRequest(
            PurchaseRequest request) {

        if (request.getItems() != null) {

            request.getItems().size();

            request.getItems().forEach(item -> {

                if (item.getCategory() != null) {

                    item.getCategory()
                            .getCategoryId();
                }
            });
        }

        if (request.getUser() != null) {

            request.getUser().getUserId();
            request.getUser().getName();

            if (request.getUser().getRole() != null) {

                request.getUser()
                        .getRole()
                        .getRoleName();
            }

            if (request.getUser()
                    .getDepartment() != null) {

                request.getUser()
                        .getDepartment()
                        .getDeptId();
            }
        }

        if (request.getDepartment() != null) {

            request.getDepartment()
                    .getDeptId();
        }

        if (request.getSelectedSupplier() != null) {

            request.getSelectedSupplier()
                    .getSupplierId();
        }
    }
}