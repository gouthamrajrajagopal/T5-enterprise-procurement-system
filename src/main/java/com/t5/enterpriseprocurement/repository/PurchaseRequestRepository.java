package com.t5.enterpriseprocurement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.t5.enterpriseprocurement.entity.PurchaseRequest;
import com.t5.enterpriseprocurement.entity.User;
import java.util.List;

import org.springframework.data.jpa.repository.Query;

import com.t5.enterpriseprocurement.dto.DepartmentReportDTO;

public interface PurchaseRequestRepository extends JpaRepository<PurchaseRequest, Integer> {

    List<PurchaseRequest> findByUser(User user);

    List<PurchaseRequest> findByStatus(String status);

    PurchaseRequest findByRequestNumber(String requestNumber);

    long countByStatusContaining(String status);

    long countByStatus(String status);
    
    long countByDepartmentDeptId(Integer deptId);
    

}