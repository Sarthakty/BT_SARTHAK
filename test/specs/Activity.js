/**
 * Created by BIBHU on 17-JAN-17.
 */

var pdf = require('../helper/PdfReports');
var logreport = require('../helper/LogReport');
var PropertiesReader=require('properties-reader');
var gen=require('../helper/GenericLib');
var loginBrownTape=require('../../Pages/BrowntapeLoginPO');
var activityLog=require('../../pages/ActivitiesLogPO');
var chai=require('chai');
var expect = require('chai').expect;

var module = "ACTIVITY MODULE";
logreport.createLogFolder();
pdf.createPdfFolder();
pdf.createPdf(module);
pdf.pdfHeaderFileForModule(module);
var log=logreport.logger("Report");

var properties=PropertiesReader('PropertiesFile/config.properties');
var generic= null;
var loginBT = null;
var activity = null;


log.info('*********  ACTIVITY MODULE ***************');
log.info('');

describe("ACTIVITY MODULE",function ()
{
    generic=new gen();
    loginBT=new loginBrownTape();
    var bt=generic.excelReadingData(properties.get('EXCEL'),properties.get('SHEET'),properties.get('TCID1'));

    it(generic.excelReadingData('TestCases.xlsx','List Watch Module','AC_TC_01')[1], function ()
    {
        activity=new activityLog();
        try
        {
            log.info('********* Start of Error Activity  ***************');
            browser.windowHandleMaximize();
            log.info("WINDOW MAXIMIZING DONE");

            generic.loadURL(properties.get('BTURL'));
            expect(browser.getUrl()).to.equal(properties.get('BTURL'));
            log.info('Reading URL From Properties File Done');
            log.info('url loading done');

            log.info('Reading BrownTape USERNAME and PASSWORD From Excel Done');
            loginBT.brownTapeLogin(bt[1],bt[2]);
            log.info('Logged into BrownTape Done');


            var timeAndReason=activity.resonsAndTimeOfFailure();
            log.info('Timestamps');
            log.info(timeAndReason[0]);
            log.info('Status Message');
            log.info(timeAndReason[1]);
            log.info(' Cause and time of the failure for the choosen product is displayed on "Activites" page');

            pdf.pdfWriteData("AC_TC_01", generic.excelReadingData('TestCases.xlsx', 'Activity','AC_TC_01')[1],"Pass");
            pdf.closePdf(module);
            log.info('********* End of Error Activity   ***************');
        }
        catch(e)
        {
            log.info('this Test Case got Failed :'+e)
            pdf.pdfWriteData("AC_TC_01", generic.excelReadingData('TestCases.xlsx', 'Activity','AC_TC_01')[1],"Fail");
            pdf.closePdf(module);
            log.info('********* End of Error Activity   ***************');
            throw  e;
        }

    })


});

