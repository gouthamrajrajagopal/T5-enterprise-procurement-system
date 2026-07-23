package com.t5.enterpriseprocurement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.t5.enterpriseprocurement.entity.ApprovalHierarchy;
import com.t5.enterpriseprocurement.service.ApprovalHierarchyService;

@RestController
@RequestMapping("/approval-hierarchy")
public class ApprovalHierarchyController {

    @Autowired
    private ApprovalHierarchyService approvalHierarchyService;

    @PostMapping
    public ApprovalHierarchy saveApprovalHierarchy(
            @RequestBody ApprovalHierarchy approvalHierarchy) {

        return approvalHierarchyService.saveApprovalHierarchy(approvalHierarchy);
    }

    @GetMapping
    public List<ApprovalHierarchy> getAllApprovalHierarchies() {

        return approvalHierarchyService.getAllApprovalHierarchies();
    }

    @GetMapping("/{id}")
    public ApprovalHierarchy getApprovalHierarchyById(
            @PathVariable Integer id) {

        return approvalHierarchyService.getApprovalHierarchyById(id);
    }

    @PutMapping("/{id}")
    public ApprovalHierarchy updateApprovalHierarchy(
            @PathVariable Integer id,
            @RequestBody ApprovalHierarchy approvalHierarchy) {

        return approvalHierarchyService.updateApprovalHierarchy(id, approvalHierarchy);
    }

    @DeleteMapping("/{id}")
    public String deleteApprovalHierarchy(@PathVariable Integer id) {

        approvalHierarchyService.deleteApprovalHierarchy(id);
        return "Approval Hierarchy deleted successfully!";
    }

}