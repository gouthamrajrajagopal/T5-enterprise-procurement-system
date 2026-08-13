package com.t5.enterpriseprocurement.service.impl;

import java.util.List;
import org.springframework.stereotype.Service;
import com.t5.enterpriseprocurement.entity.Department;
import com.t5.enterpriseprocurement.repository.DepartmentRepository;
import com.t5.enterpriseprocurement.service.DepartmentService;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    DepartmentServiceImpl(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    @Override
    public Department saveDepartment(Department department) {
        return departmentRepository.save(department);
    }

    @Override
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    @Override
    public Department getDepartmentById(Integer id) {
        return departmentRepository.findById(id).orElse(null);
    }

    @Override
    public Department updateDepartment(Integer id, Department department) {

        Department existingDepartment = departmentRepository.findById(id).orElse(null);

        if (existingDepartment != null) {
            existingDepartment.setDeptCode(department.getDeptCode());
            existingDepartment.setDeptName(department.getDeptName());
            existingDepartment.setDescription(department.getDescription());
            existingDepartment.setStatus(department.getStatus());
            existingDepartment.setUpdatedAt(department.getUpdatedAt());

            return departmentRepository.save(existingDepartment);
        }

        return null;
    }

    @Override
    public void deleteDepartment(Integer id) {
        departmentRepository.deleteById(id);
    }
}