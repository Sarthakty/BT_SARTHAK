/**
 * Created by BIBHU on 17-Jan-17.
 */
var PropertiesReader=require('properties-reader');
var pdf = require('../helper/PdfReports');
var logreport = require('../helper/LogReport');
var gen=require('../helper/GenericLib');
var PropertiesReader=require('properties-reader');
var channellisting=require('../../pages/ChannelListingPO');
var loginBrownTape=require('../../Pages/BrowntapeLoginPO');
var listWatch=require('../../pages/ListingWatchPO');
var stockComparing=require('../../pages/CompareStockPO');
var comparingZeroProducts=require('../../pages/ZeroProductPO');
var comparingNonZeroProducts=require('../../pages/NonZeroProductPO');
var chai=require('chai');
var expect = require('chai').expect;

var module = "INVENTORY MODULE";
logreport.createLogFolder();
pdf.createPdfFolder();
pdf.createPdf(module);
pdf.pdfHeaderFileForModule(module);
var log=logreport.logger("Report");

var properties=PropertiesReader('PropertiesFile/config.properties');
var list = null;
var generic= null;
var loginBT = null;
var watch=null;
var compare=null;
var outOfStock=null;
var inStock=null;

log.info('********* INVENTORY MODULE ***************');
log.info('');

describe("INVENTORY MODULE",function ()
{
    generic=new gen();
    loginBT=new loginBrownTape();

    var bt=generic.excelReadingData(properties.get('EXCEL'),properties.get('SHEET'),properties.get('TCID1'));

    it(generic.excelReadingData('TestCases.xlsx','Inventory','IN_TC_01')[1], function ()
    {
        watch=new listWatch();
        log.info('********* Start of Listing Watch ***************');
        try
        {
            browser.windowHandleMaximize();
            log.info('Window Maximizing Done');

            generic.loadURL(properties.get('BTURL'));
            expect(browser.getUrl()).to.equal(properties.get('BTURL'));
            log.info('Reading URL From Properties File Done');
            log.info('url loading done');

            log.info('Reading BrownTape USERNAME and PASSWORD From Excel Done');
            loginBT.brownTapeLogin(bt[1],bt[2]);
            log.info('Logged into BrownTape Done');

            var sd=generic.excelReadingData(properties.get('EXCEL'),properties.get('SHEET'),properties.get('TCID2'));
            log.info('Reading SnapDeal USERNAME and PASSWORD From Excel Done');
            var listchannel=watch.listSnapdeal(properties.get('SDURL'),sd[1],sd[2]);
            expect(listchannel[0]).to.equal(listchannel[1]);
            log.info('Reading URL From Properties File Done');
            log.info("Total listing under BT and channel is same ");

            pdf.pdfWriteData("IN_TC_01", generic.excelReadingData('TestCases.xlsx', 'Inventory','IN_TC_01')[1],"Pass");
        }
        catch(e)
        {
            log.info('Test Case Got Failed Due to : '+e);
            pdf.pdfWriteData("IN_TC_01", generic.excelReadingData('TestCases.xlsx', 'Inventory','IN_TC_01')[1],"Fail");
            log.info('********* End of Listing Watch  *************');
            throw  e;
        }
        log.info('********* End of Listing Watch  *************');
    })

    it(generic.excelReadingData('TestCases.xlsx','Inventory','IN_TC_02')[1], function ()
    {
        log.info('*********  Start of Channel Listing  ***************');
        list = new channellisting();

        try
        {
            generic.loadURL(properties.get('BTURL'));
            expect(browser.getUrl()).to.equal(properties.get('BTURL'));
            log.info('Reading URL From Properties File Done');
            log.info('url loading done');

            log.info('Reading BrownTape USERNAME and PASSWORD From Excel Done');
            loginBT.brownTapeLogin(bt[1],bt[2]);
            log.info('Logged into BrownTape Done');

            var channel=list.channellist();
            expect(channel[0]).to.equal(channel[1]);
            log.info(' Channel listings shown on the Inventory List Page and the Product Details Page are same');

            pdf.pdfWriteData("IN_TC_02",generic.excelReadingData('TestCases.xlsx','Inventory','IN_TC_02')[1],"Pass");
        }
        catch(e)
        {
            log.info('this Test Case got Failed :'+e)
            pdf.pdfWriteData("IN_TC_02",generic.excelReadingData('TestCases.xlsx','Inventory','IN_TC_02')[1],"Fail");
            log.info('********* End of Channel Listing   ***************');
            throw  e;
        }

        log.info('********* End of Channel Listing   ***************');
    })

    it(generic.excelReadingData('TestCases.xlsx','Inventory','IN_TC_03')[1], function ()
    {
        log.info('********* Start of Comparing Stock  ***************');
        compare=new stockComparing();

        try
        {
            generic.loadURL(properties.get('BTURL'));
            expect(browser.getUrl()).to.equal(properties.get('BTURL'));
            log.info('Reading URL From Properties File Done');
            log.info('url loading done');

            log.info('Reading BrownTape USERNAME and PASSWORD From Excel Done');
            loginBT.brownTapeLogin(bt[1],bt[2]);
            log.info('Logged into BrownTape Done');

            var stocks=compare.compareQuantity();
            expect(stocks).to.equal("Pass");
            log.info('The condition "QtyOnChannel <= DedicatedStock) == TRUE" is satisfied');

            pdf.pdfWriteData("IN_TC_03",generic.excelReadingData('TestCases.xlsx','Inventory','IN_TC_03')[1],"Pass");
            log.info('********* End of Comparing Stock ***************');
        }
        catch(e)
        {
            log.info('Test Case Got Failed Due to : '+e)
            pdf.pdfWriteData("IN_TC_03",generic.excelReadingData('TestCases.xlsx','Inventory','IN_TC_03')[1],"Fail");
            log.info('********* End of Comparing Stock ***************');
            throw  e;
        }
    })

    it(generic.excelReadingData('TestCases.xlsx','Inventory','IN_TC_04')[1], function ()
    {
        log.info('********* Start of Comparing out of stock Products  ***************');
        outOfStock=new comparingZeroProducts();

         try
         {
             generic.loadURL(properties.get('BTURL'));
             expect(browser.getUrl()).to.equal(properties.get('BTURL'));
             log.info('Reading URL From Properties File Done');
             log.info('url loading done');

             log.info('Reading BrownTape USERNAME and PASSWORD From Excel Done');
             loginBT.brownTapeLogin(bt[1],bt[2]);
             log.info('Logged into BrownTape Done');

             var pt=generic.excelReadingData(properties.get('EXCEL'),properties.get('SHEET'),properties.get('TCID3'));
             log.info('Reading Paytm USERNAME and PASSWORD From Excel Done');
             var zeroProducts=outOfStock.stockPaytm(properties.get('PTURL'),pt[1],pt[2]);
             expect(zeroProducts[0]).to.equal(zeroProducts[1]);
             log.info('Reading URL From Properties File Done');
             log.info("Stock of choosen zero quantity product is same in Paytm seller and BT");

             pdf.pdfWriteData("IN_TC_04",generic.excelReadingData('TestCases.xlsx','Inventory','IN_TC_04')[1],"Pass");
             log.info('********* End of Comparing out of stock Products  *************');
        }
        catch(e)
        {
            log.info('Test Case Got Failed Due to : '+e);
            pdf.pdfWriteData("IN_TC_04",generic.excelReadingData('TestCases.xlsx','Inventory','IN_TC_04')[1],"Fail");
            log.info('********* End of Comparing out of stock Products  *************');
            throw  e;
        }

 })

    it(generic.excelReadingData('TestCases.xlsx','Inventory','IN_TC_05')[1], function ()
    {
        log.info('********* Start of Comparing Non-Zero Products and stocks ***************');
        inStock=new comparingNonZeroProducts();

        try
        {
            generic.loadURL(properties.get('BTURL'));
            expect(browser.getUrl()).to.equal(properties.get('BTURL'));
            log.info('Reading URL From Properties File Done');
            log.info('url loading done');

            log.info('Reading BrownTape USERNAME and PASSWORD From Excel Done');
            loginBT.brownTapeLogin(bt[1],bt[2]);
            log.info('Logged into BrownTape Done');

            var pt=generic.excelReadingData(properties.get('EXCEL'),properties.get('SHEET'),properties.get('TCID3'));
            log.info('Reading Paytm USERNAME and PASSWORD From Excel Done');
            var nonZero=inStock.stockPaytm(properties.get('PTURL'),pt[1],pt[2]);
            expect(nonZero[0]).to.equal(nonZero[1]);
            log.info('Reading URL From Properties File Done');
            log.info("Stock of choosen non-zero quantity product is same in Paytm seller and BT");

            pdf.pdfWriteData("IN_TC_05",generic.excelReadingData('TestCases.xlsx','Inventory','IN_TC_05')[1],"Pass");
            log.info('********* End of Comparing Non-Zero Products and stocks  *************');
            pdf.closePdf(module);
        }
        catch(e)
        {
            log.info('Test Case Got Failed Due to : '+e);
            pdf.pdfWriteData("IN_TC_05",generic.excelReadingData('TestCases.xlsx','Inventory','IN_TC_05')[1],"Fail");
            log.info('********* End of Comparing Non-Zero Products and stocks  *************');
            pdf.closePdf(module);
            throw  e;
        }
    })
});

