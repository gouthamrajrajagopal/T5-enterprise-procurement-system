package com.t5.enterpriseprocurement.service.impl;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import com.t5.enterpriseprocurement.exception.ResourceNotFoundException;
import com.t5.enterpriseprocurement.dto.PurchaseRequestDTO;
import com.t5.enterpriseprocurement.dto.PurchaseRequestResponseDTO;
import com.t5.enterpriseprocurement.entity.Department;
import com.t5.enterpriseprocurement.entity.PurchaseRequest;
import com.t5.enterpriseprocurement.entity.User;
import com.t5.enterpriseprocurement.repository.DepartmentRepository;
import com.t5.enterpriseprocurement.repository.PurchaseRequestRepository;
import com.t5.enterpriseprocurement.repository.UserRepository;
import com.t5.enterpriseprocurement.service.PurchaseRequestService;
import com.t5.enterpriseprocurement.entity.Supplier;
import com.t5.enterpriseprocurement.repository.SupplierRepository;
import com.t5.enterpriseprocurement.audit.AuditService;
import com.t5.enterpriseprocurement.exception.BadRequestException;
@Service
public class PurchaseRequestServiceImpl implements PurchaseRequestService {

    private final PurchaseRequestRepository purchaseRequestRepository;
    private final DepartmentRepository departmentRepository;
    private final UserRepository userRepository;
    private final SupplierRepository supplierRepository;
    private final AuditService auditService;

    public PurchaseRequestServiceImpl(
            PurchaseRequestRepository purchaseRequestRepository,
            DepartmentRepository departmentRepository,
            UserRepository userRepository,
            SupplierRepository supplierRepository,
            AuditService auditService) {

        this.purchaseRequestRepository = purchaseRequestRepository;
        this.departmentRepository = departmentRepository;
        this.userRepository = userRepository;
        this.supplierRepository = supplierRepository;
        this.auditService = auditService;
    }

    @Override
    public PurchaseRequestResponseDTO managerApprove(Integer requestId) {

        PurchaseRequest request = purchaseRequestRepository.findById(requestId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Purchase Request not found"));

        if (!"PENDING_MANAGER_APPROVAL".equals(request.getStatus())) {
            throw new BadRequestException(
                    "Request is not awaiting manager approval");
        }

        request.setStatus("PENDING_FINANCE_APPROVAL");

        PurchaseRequest savedRequest =
                purchaseRequestRepository.save(request);

        return convertToResponse(savedRequest);
    }
    
    @Override
    public PurchaseRequestResponseDTO rejectRequest(Integer requestId) {
        return null;
    }
    @Override
    public PurchaseRequestResponseDTO createPurchaseRequest(PurchaseRequestDTO requestDTO) {

        Department department = departmentRepository.findById(requestDTO.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department not found."));

        // Temporary until JWT integration
        User user = userRepository.findById(3)
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));

        PurchaseRequest purchaseRequest = new PurchaseRequest();

        purchaseRequest.setRequestNumber(generateRequestNumber());
        purchaseRequest.setUser(user);
        purchaseRequest.setDepartment(department);
        purchaseRequest.setDescription(requestDTO.getDescription());
        purchaseRequest.setQuantity(requestDTO.getQuantity());
        purchaseRequest.setEstimatedAmount(requestDTO.getEstimatedAmount());
        purchaseRequest.setUrgent(requestDTO.getUrgent());

        PurchaseRequest savedRequest =
                purchaseRequestRepository.save(purchaseRequest);

        auditService.log(
                user.getName(),
                "Created Purchase Request",
                "Purchase Request");

        return convertToResponse(savedRequest);
    }
    
    @Override
    public PurchaseRequestResponseDTO submitRequest(Integer requestId) {

        PurchaseRequest request = purchaseRequestRepository.findById(requestId)
                .orElseThrow(() ->
                        new RuntimeException("Purchase Request not found"));

        if (!"DRAFT".equals(request.getStatus())) {
            throw new RuntimeException(
                    "Only DRAFT requests can be submitted.");
        }

        request.setStatus("PENDING_MANAGER_APPROVAL");

        PurchaseRequest updatedRequest =
                purchaseRequestRepository.save(request);
        auditService.log(
                request.getUser().getName(),
                "Submitted Purchase Request",
                "Purchase Request");

        return convertToResponse(updatedRequest);
    }
    
    @Override
    public PurchaseRequestResponseDTO selectSupplier(
            Integer requestId,
            Integer supplierId) {

        PurchaseRequest request = purchaseRequestRepository.findById(requestId)
                .orElseThrow(() ->
                        new RuntimeException("Purchase Request not found"));

        Supplier supplier = supplierRepository.findById(supplierId)
                .orElseThrow(() ->
                        new RuntimeException("Supplier not found"));

        if (!"APPROVED".equals(request.getStatus())) {
            throw new RuntimeException(
                    "Purchase Request is not approved");
        }

        request.setSupplier(supplier);
        request.setStatus("VENDOR_SELECTED");

        PurchaseRequest updated =
                purchaseRequestRepository.save(request);
        auditService.log(
                request.getUser().getName(),
                "Manager Approved Purchase Request",
                "Approval");
        return convertToResponse(updated);
    }

    @Override
    public List<PurchaseRequestResponseDTO> getAllPurchaseRequests() {

        return purchaseRequestRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public PurchaseRequestResponseDTO getPurchaseRequestById(Integer requestId) {

        PurchaseRequest request = purchaseRequestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Purchase Request not found."));

        return convertToResponse(request);
    }
    

    @Override
    public PurchaseRequestResponseDTO updatePurchaseRequest(
            Integer requestId,
            PurchaseRequestDTO requestDTO) {

        PurchaseRequest request = purchaseRequestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Purchase Request not found."));

        Department department = departmentRepository.findById(requestDTO.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department not found."));

        request.setDepartment(department);
        request.setDescription(requestDTO.getDescription());
        request.setQuantity(requestDTO.getQuantity());
        request.setEstimatedAmount(requestDTO.getEstimatedAmount());
        request.setUrgent(requestDTO.getUrgent());

        PurchaseRequest updated =
                purchaseRequestRepository.save(request);
        auditService.log(
                request.getUser().getName(),
                "Finance Approved Purchase Request",
                "Approval");
        return convertToResponse(updated);
    }

    @Override
    public void deletePurchaseRequest(Integer requestId) {

        PurchaseRequest request = purchaseRequestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Purchase Request not found."));
        auditService.log(
                request.getUser().getName(),
                "Deleted Purchase Request",
                "Purchase Request");
        purchaseRequestRepository.delete(request);
    }
    
 
    @Override
    public PurchaseRequestResponseDTO procurementApprove(Integer requestId) {

        PurchaseRequest request = purchaseRequestRepository.findById(requestId)
                .orElseThrow(() ->
                        new RuntimeException("Purchase Request not found"));

        if (!"PENDING_PROCUREMENT_APPROVAL".equals(request.getStatus())) {
            throw new RuntimeException(
                    "Request is not awaiting owner approval");
        }

        request.setStatus("APPROVED");

        PurchaseRequest updated =
                purchaseRequestRepository.save(request);
        auditService.log(
                request.getUser().getName(),
                "Procurement Approved Purchase Request",
                "Approval");
        return convertToResponse(updated);
    }
    
    @Override
    public PurchaseRequestResponseDTO financeApprove(Integer requestId) {

        PurchaseRequest request = purchaseRequestRepository.findById(requestId)
                .orElseThrow(() ->
                        new RuntimeException("Purchase Request not found"));

        if (!"PENDING_FINANCE_APPROVAL".equals(request.getStatus())) {
            throw new RuntimeException(
                    "Request is not awaiting finance approval");
        }

        request.setStatus("PENDING_PROCUREMENT_APPROVAL");

        PurchaseRequest updated =
                purchaseRequestRepository.save(request);
        auditService.log(
                request.getUser().getName(),
                "Supplier Selected",
                "Supplier");
        return convertToResponse(updated);
    }

    private String generateRequestNumber() {

        return "PR-" +
                LocalDateTime.now().format(
                        DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
    }

    private PurchaseRequestResponseDTO convertToResponse(
            PurchaseRequest request) {

        PurchaseRequestResponseDTO response =
                new PurchaseRequestResponseDTO();

        response.setRequestId(request.getRequestId());
        response.setRequestNumber(request.getRequestNumber());
        response.setDescription(request.getDescription());
        response.setQuantity(request.getQuantity());
        response.setEstimatedAmount(request.getEstimatedAmount());
        response.setUrgent(request.getUrgent());
        response.setStatus(request.getStatus());
        response.setDepartmentName(request.getDepartment().getDeptName());
        response.setCreatedBy(request.getUser().getName());
        response.setCreatedAt(request.getCreatedAt());
        
        if (request.getSupplier() != null) {
            response.setSupplierName(
                    request.getSupplier().getSupplierName());
        }

        return response;
    }
}