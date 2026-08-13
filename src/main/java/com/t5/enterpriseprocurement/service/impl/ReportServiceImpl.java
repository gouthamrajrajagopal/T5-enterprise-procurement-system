package com.t5.enterpriseprocurement.service.impl;

import java.math.BigDecimal;

import org.springframework.stereotype.Service;

import com.t5.enterpriseprocurement.dto.SpendAnalysisDTO;
import com.t5.enterpriseprocurement.service.ReportService;

@Service
public class ReportServiceImpl implements ReportService {

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
}