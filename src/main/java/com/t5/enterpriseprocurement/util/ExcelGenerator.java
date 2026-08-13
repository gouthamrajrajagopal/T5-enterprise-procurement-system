package com.t5.enterpriseprocurement.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class ExcelGenerator {

    public static ByteArrayInputStream generateExcel() {

        XSSFWorkbook workbook =
                new XSSFWorkbook();

        XSSFSheet sheet =
                workbook.createSheet("Procurement Report");

        Row row0 = sheet.createRow(0);

        row0.createCell(0).setCellValue("Metric");

        row0.createCell(1).setCellValue("Value");

        Row row1 = sheet.createRow(1);

        row1.createCell(0).setCellValue("Purchase Orders");

        row1.createCell(1).setCellValue(2);

        Row row2 = sheet.createRow(2);

        row2.createCell(0).setCellValue("Total Spend");

        row2.createCell(1).setCellValue(153250);

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