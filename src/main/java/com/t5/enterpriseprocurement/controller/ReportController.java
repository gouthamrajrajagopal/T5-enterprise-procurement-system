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
import com.t5.enterpriseprocurement.dto.MonthlyReportDTO;
import java.util.List;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

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
    
    @GetMapping("/export/pdf")
    public ResponseEntity<byte[]> exportPdf() {

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=Procurement_Report.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(reportService.exportPdf());
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
    
    @GetMapping("/export/excel")
    public ResponseEntity<byte[]> exportExcel() {

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=Procurement_Report.xlsx")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(reportService.exportExcel());
    }
    
    @GetMapping("/monthly")
    public ResponseEntity<List<MonthlyReportDTO>> getMonthlyReport() {

        return ResponseEntity.ok(
                reportService.getMonthlyReport()
        );
    }
    
}