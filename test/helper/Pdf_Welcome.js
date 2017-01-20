var pdf = require('../helper/PdfReports');


pdf.createPdfFolder();
pdf.createPdf("WelcomePage");
pdf.pdfHeaderFileGeneration();

pdf.closeWelcomePdf();

var fs = require('fs');

var contents = fs.readFileSync("PropertiesFile/config.json");
var jsonContent = JSON.parse(contents);
dir = 'pdfReports/Run_'+jsonContent.currentDateAndTime;
var sleep = require('thread-sleep');

var start = Date.now();
var res = sleep(7000);
var end = Date.now();

var merge = require('easy-pdf-merge');

browser.pause(10000);

 merge([dir+'/WelcomePage.pdf',dir+'/SUMMARY.pdf',dir+'/ACTIVITY MODULE.pdf',dir+'/INVENTORY MODULE.pdf'],dir+'/SuiteExecutionReport.pdf',function(err){

 if(err)
 return console.log(err);
 console.log('Successfully merged!');
 var del = require('delete');
 del([dir+'/SUMMARY.pdf'], function (err)
 {
 if (err) throw err;
 console.log('done!');
 });
 del([dir+'/WelcomePage.pdf'], function (err)
 {
 if (err) throw err;
 console.log('done!');
 });

 del([dir+'/ACTIVITY MODULE.pdf'], function (err)
 {
 if (err) throw err;
 console.log('done!');
 });
 del([dir+'/INVENTORY MODULE.pdf'], function (err)
 {
 if (err) throw err;

 console.log('done!');
 });
 });