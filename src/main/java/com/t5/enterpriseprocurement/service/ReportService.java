package com.t5.enterpriseprocurement.service;

import com.t5.enterpriseprocurement.dto.SpendAnalysisDTO;
import java.util.List;
import com.t5.enterpriseprocurement.dto.DepartmentReportDTO;

public interface ReportService {

    SpendAnalysisDTO getSpendAnalysis();
    List<DepartmentReportDTO> getDepartmentReport();

}