package com.t5.enterpriseprocurement.service;

import java.util.List;

import com.t5.enterpriseprocurement.dto.DepartmentReportDTO;
import com.t5.enterpriseprocurement.dto.MonthlyReportDTO;
import com.t5.enterpriseprocurement.dto.SpendAnalysisDTO;
import com.t5.enterpriseprocurement.dto.SupplierPerformanceDTO;

public interface ReportService {

    SpendAnalysisDTO getSpendAnalysis();

    List<DepartmentReportDTO> getDepartmentReport();

    List<SupplierPerformanceDTO> getSupplierPerformance();

    List<MonthlyReportDTO> getMonthlyReport();

    byte[] exportPdf();

    byte[] exportExcel();
}