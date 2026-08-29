package com.t5.enterpriseprocurement.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.t5.enterpriseprocurement.dto.DashboardResponseDTO;
import com.t5.enterpriseprocurement.service.DashboardService;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/summary")
    public ResponseEntity<DashboardResponseDTO> getDashboardSummary() {

        return ResponseEntity.ok(
                dashboardService.getDashboardSummary());

    }
}