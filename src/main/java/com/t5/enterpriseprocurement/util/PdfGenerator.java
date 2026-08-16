package com.t5.enterpriseprocurement.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

import com.lowagie.text.Document;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;
import com.t5.enterpriseprocurement.dto.SpendAnalysisDTO;

public class PdfGenerator {

    public static ByteArrayInputStream generatePdf(SpendAnalysisDTO spend) {

        Document document = new Document();

        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {

            PdfWriter.getInstance(document, out);

            document.open();

            document.add(new Paragraph("Enterprise Procurement Report"));

            document.add(new Paragraph("-----------------------------"));
            document.add(new Paragraph("Purchase Orders : " + spend.getTotalPurchaseOrders()));
            document.add(new Paragraph("Total Spend : " + spend.getTotalSpend()));
            document.add(new Paragraph("Average Purchase : " + spend.getAveragePurchase()));
            document.add(new Paragraph("Highest Purchase : " + spend.getHighestPurchase()));
            document.add(new Paragraph("Lowest Purchase : " + spend.getLowestPurchase()));

            document.close();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ByteArrayInputStream(out.toByteArray());
    }

}
