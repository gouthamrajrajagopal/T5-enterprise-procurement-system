package com.t5.enterpriseprocurement.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import com.t5.enterpriseprocurement.dto.SpendAnalysisDTO;

public class ExcelGenerator {

    public static ByteArrayInputStream generateExcel(SpendAnalysisDTO spend) {

        XSSFWorkbook workbook =
                new XSSFWorkbook();

        XSSFSheet sheet =
                workbook.createSheet("Procurement Report");

        Row row0 = sheet.createRow(0);

        row0.createCell(0).setCellValue("Metric");

        row0.createCell(1).setCellValue("Value");

        Row row1 = sheet.createRow(1);

        row1.createCell(0).setCellValue("Purchase Orders");

        row1.createCell(1).setCellValue(spend.getTotalPurchaseOrders());

        Row row2 = sheet.createRow(2);

        row2.createCell(0).setCellValue("Total Spend");

        row2.createCell(1).setCellValue(spend.getTotalSpend().doubleValue());

        Row row3 = sheet.createRow(3);
        row3.createCell(0).setCellValue("Average Purchase");
        row3.createCell(1).setCellValue(spend.getAveragePurchase().doubleValue());

        Row row4 = sheet.createRow(4);
        row4.createCell(0).setCellValue("Highest Purchase");
        row4.createCell(1).setCellValue(spend.getHighestPurchase().doubleValue());

        Row row5 = sheet.createRow(5);
        row5.createCell(0).setCellValue("Lowest Purchase");
        row5.createCell(1).setCellValue(spend.getLowestPurchase().doubleValue());

        ByteArrayOutputStream out =
                new ByteArrayOutputStream();

        try {

            workbook.write(out);

            workbook.close();

        } catch (Exception e) {

            e.printStackTrace();

        }

        return new ByteArrayInputStream(out.toByteArray());

    }

}
