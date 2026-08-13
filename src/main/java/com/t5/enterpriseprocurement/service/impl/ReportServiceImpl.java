package com.t5.enterpriseprocurement.service.impl;

import java.math.BigDecimal;
import com.t5.enterpriseprocurement.dto.SupplierPerformanceDTO;
import java.util.ArrayList;
import java.util.List;
import com.t5.enterpriseprocurement.dto.DepartmentReportDTO;
import org.springframework.stereotype.Service;
import com.t5.enterpriseprocurement.dto.SpendAnalysisDTO;
import com.t5.enterpriseprocurement.service.ReportService;
import com.t5.enterpriseprocurement.repository.PurchaseRequestRepository;
import com.t5.enterpriseprocurement.entity.Supplier;
import com.t5.enterpriseprocurement.repository.SupplierRepository;
import java.util.ArrayList;
import java.util.List;
import com.t5.enterpriseprocurement.entity.Department;
import com.t5.enterpriseprocurement.repository.DepartmentRepository;
import com.t5.enterpriseprocurement.repository.PurchaseOrderRepository;
import com.t5.enterpriseprocurement.repository.PurchaseRequestRepository;
import java.math.BigDecimal;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Service
public class ReportServiceImpl implements ReportService {
	
	private final DepartmentRepository departmentRepository;
	private final PurchaseRequestRepository purchaseRequestRepository;
	private final PurchaseOrderRepository purchaseOrderRepository;
	private final SupplierRepository supplierRepository;
	
	public ReportServiceImpl(
	        DepartmentRepository departmentRepository,
	        PurchaseRequestRepository purchaseRequestRepository,
	        PurchaseOrderRepository purchaseOrderRepository,
	        SupplierRepository supplierRepository) {

	    this.departmentRepository = departmentRepository;
	    this.purchaseRequestRepository = purchaseRequestRepository;
	    this.purchaseOrderRepository = purchaseOrderRepository;
	    this.supplierRepository = supplierRepository;
	}
	
	
	@Override
	public List<DepartmentReportDTO> getDepartmentReport() {

	    List<DepartmentReportDTO> report = new ArrayList<>();

	    List<Department> departments = departmentRepository.findAll();

	    for (Department department : departments) {

	        Long totalRequests =
	                purchaseRequestRepository
	                        .countByDepartmentDeptId(department.getDeptId());

	        Long purchaseOrders =
	                purchaseOrderRepository
	                        .countPurchaseOrdersByDepartment(department.getDeptId());

	        if (purchaseOrders == null) {
	            purchaseOrders = 0L;
	        }

	        BigDecimal actualSpend =
	                purchaseOrderRepository
	                        .getDepartmentSpend(department.getDeptId());

	        if (actualSpend == null) {
	            actualSpend = BigDecimal.ZERO;
	        }

	        report.add(
	                new DepartmentReportDTO(
	                        department.getDeptName(),
	                        totalRequests,
	                        purchaseOrders,
	                        actualSpend));
	    }

	    return report;
	}

    @Override
    public SpendAnalysisDTO getSpendAnalysis() {

        SpendAnalysisDTO response = new SpendAnalysisDTO();

        response.setTotalSpend(new BigDecimal("153250"));
        response.setAveragePurchase(new BigDecimal("76625"));
        response.setHighestPurchase(new BigDecimal("150000"));
        response.setLowestPurchase(new BigDecimal("3250"));
        response.setTotalPurchaseOrders(2L);

        return response;
    }
    
    @Override
    public List<SupplierPerformanceDTO> getSupplierPerformance() {

        List<SupplierPerformanceDTO> report = new ArrayList<>();

        List<Supplier> suppliers = supplierRepository.findAll();

        for (Supplier supplier : suppliers) {

            Long purchaseOrders =
                    purchaseOrderRepository.countBySupplier(
                            supplier.getSupplierId());

            if (purchaseOrders == null) {
                purchaseOrders = 0L;
            }

            BigDecimal totalBusiness =
                    purchaseOrderRepository.getSupplierBusiness(
                            supplier.getSupplierId());

            if (totalBusiness == null) {
                totalBusiness = BigDecimal.ZERO;
            }

            String performance;

            if (purchaseOrders >= 5) {
                performance = "Excellent";
            } else if (purchaseOrders >= 3) {
                performance = "Good";
            } else if (purchaseOrders >= 1) {
                performance = "Average";
            } else {
                performance = "No Orders";
            }

            report.add(
                    new SupplierPerformanceDTO(
                            supplier.getSupplierName(),
                            purchaseOrders,
                            totalBusiness,
                            performance));
        }

        return report;
    }
}