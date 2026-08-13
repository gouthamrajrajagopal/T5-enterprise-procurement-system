package com.t5.enterpriseprocurement.controller;
import java.util.List;
import com.t5.enterpriseprocurement.dto.DepartmentReportDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.t5.enterpriseprocurement.dto.SupplierPerformanceDTO;
import com.t5.enterpriseprocurement.dto.SpendAnalysisDTO;
import com.t5.enterpriseprocurement.service.ReportService;

@RestController
@RequestMapping("/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/spend")
    public ResponseEntity<SpendAnalysisDTO> getSpendAnalysis() {

        return ResponseEntity.ok(
                reportService.getSpendAnalysis());

    }
    
    @GetMapping("/suppliers")
    public ResponseEntity<List<SupplierPerformanceDTO>> getSupplierPerformance() {

        return ResponseEntity.ok(
                reportService.getSupplierPerformance());

    }
    
    @GetMapping("/departments")
    public ResponseEntity<List<DepartmentReportDTO>> getDepartmentReport() {

        return ResponseEntity.ok(
                reportService.getDepartmentReport());

    }
    
}