package com.t5.enterpriseprocurement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.t5.enterpriseprocurement.entity.Department;

public interface DepartmentRepository extends JpaRepository<Department, Integer> {

}