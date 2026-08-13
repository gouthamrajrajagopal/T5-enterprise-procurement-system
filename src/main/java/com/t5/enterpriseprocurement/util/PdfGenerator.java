package com.t5.enterpriseprocurement.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

import com.lowagie.text.Document;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;

public class PdfGenerator {

    public static ByteArrayInputStream generatePdf() {

        Document document = new Document();

        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {

            PdfWriter.getInstance(document, out);

            document.open();

            document.add(new Paragraph("Enterprise Procurement Report"));

            document.add(new Paragraph("Sprint 4 Export"));

            document.add(new Paragraph("-----------------------------"));

            document.add(new Paragraph("Purchase Orders : 2"));

            document.add(new Paragraph("Total Spend : 153250"));

            document.close();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ByteArrayInputStream(out.toByteArray());
    }

}