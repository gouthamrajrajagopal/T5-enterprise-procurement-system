package com.t5.enterpriseprocurement.service;

import java.util.List;

import com.t5.enterpriseprocurement.entity.Department;

public interface DepartmentService {

    Department saveDepartment(Department department);

    List<Department> getAllDepartments();

    Department getDepartmentById(Integer id);

    Department updateDepartment(Integer id, Department department);

    void deleteDepartment(Integer id);

}