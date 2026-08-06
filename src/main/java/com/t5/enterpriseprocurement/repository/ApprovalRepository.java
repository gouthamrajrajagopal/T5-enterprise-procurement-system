package com.t5.enterpriseprocurement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.t5.enterpriseprocurement.entity.Approval;
import com.t5.enterpriseprocurement.enums.ApprovalStatus;

public interface ApprovalRepository extends JpaRepository<Approval, Integer> {

    List<Approval> findByRequestId(Integer requestId);

    List<Approval> findByApproverId(Integer approverId);

    List<Approval> findByApproverIdOrderByApprovalDateDesc(Integer approverId);

    long countByApproverIdAndStatus(
            Integer approverId,
            ApprovalStatus status
    );
}