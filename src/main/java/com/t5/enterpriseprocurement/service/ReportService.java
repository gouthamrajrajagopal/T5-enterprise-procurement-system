package com.t5.enterpriseprocurement.service;
import java.util.List;
import com.t5.enterpriseprocurement.dto.SupplierPerformanceDTO;
import com.t5.enterpriseprocurement.dto.SpendAnalysisDTO;
import java.util.List;
import com.t5.enterpriseprocurement.dto.DepartmentReportDTO;
import com.t5.enterpriseprocurement.dto.MonthlyReportDTO;

public interface ReportService {

    SpendAnalysisDTO getSpendAnalysis();
    List<DepartmentReportDTO> getDepartmentReport();
    List<SupplierPerformanceDTO> getSupplierPerformance();
    List<MonthlyReportDTO> getMonthlyReport();

}