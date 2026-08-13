package com.t5.enterpriseprocurement.service.impl;

import java.util.List;
import org.springframework.stereotype.Service;

import com.t5.enterpriseprocurement.entity.ApprovalHierarchy;
import com.t5.enterpriseprocurement.repository.ApprovalHierarchyRepository;
import com.t5.enterpriseprocurement.service.ApprovalHierarchyService;

@Service
public class ApprovalHierarchyServiceImpl implements ApprovalHierarchyService {

    private final ApprovalHierarchyRepository approvalHierarchyRepository;

    ApprovalHierarchyServiceImpl(ApprovalHierarchyRepository approvalHierarchyRepository) {
        this.approvalHierarchyRepository = approvalHierarchyRepository;
    }

    @Override
    public ApprovalHierarchy saveApprovalHierarchy(ApprovalHierarchy approvalHierarchy) {
        return approvalHierarchyRepository.save(approvalHierarchy);
    }

    @Override
    public List<ApprovalHierarchy> getAllApprovalHierarchies() {
        return approvalHierarchyRepository.findAll();
    }

    @Override
    public ApprovalHierarchy getApprovalHierarchyById(Integer id) {
        return approvalHierarchyRepository.findById(id).orElse(null);
    }

    @Override
    public ApprovalHierarchy updateApprovalHierarchy(Integer id,
            ApprovalHierarchy approvalHierarchy) {

        ApprovalHierarchy existingApprovalHierarchy =
                approvalHierarchyRepository.findById(id).orElse(null);

        if (existingApprovalHierarchy != null) {

            existingApprovalHierarchy.setDeptId(
                    approvalHierarchy.getDeptId());

            existingApprovalHierarchy.setApprovalLevel(
                    approvalHierarchy.getApprovalLevel());

            existingApprovalHierarchy.setApproverRoleId(
                    approvalHierarchy.getApproverRoleId());

            existingApprovalHierarchy.setStatus(
                    approvalHierarchy.getStatus());

            return approvalHierarchyRepository.save(existingApprovalHierarchy);
        }

        return null;
    }

    @Override
    public void deleteApprovalHierarchy(Integer id) {
        approvalHierarchyRepository.deleteById(id);
    }

}