/**
 * Created by Administrator on 19-01-2017.
 */
var pdf = require('../helper/PdfReports');
pdf.createPdfFolder();
var module = "SUMMARY";
pdf.createPdf(module);

pdf.summaryTable(module);



pdf.closeWelcomePdf();
