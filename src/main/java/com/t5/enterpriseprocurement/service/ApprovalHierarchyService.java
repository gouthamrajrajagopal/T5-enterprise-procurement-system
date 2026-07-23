package com.t5.enterpriseprocurement.service;

import java.util.List;

import com.t5.enterpriseprocurement.entity.ApprovalHierarchy;

public interface ApprovalHierarchyService {

    ApprovalHierarchy saveApprovalHierarchy(ApprovalHierarchy approvalHierarchy);

    List<ApprovalHierarchy> getAllApprovalHierarchies();

    ApprovalHierarchy getApprovalHierarchyById(Integer id);

    ApprovalHierarchy updateApprovalHierarchy(Integer id,
            ApprovalHierarchy approvalHierarchy);

    void deleteApprovalHierarchy(Integer id);

}