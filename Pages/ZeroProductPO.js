/**
 * Created by Bibhu on 16-01-2017.
 */
var id=null;
var BTStock=null;
var paytmStock=null;
var quantity=[];
class Zero
{

    get inventoryMenu()
    {
        return browser.element("//div[contains(text(),'Inventory')]");
    }
    get sellableQty()
    {
        return browser.element("//button[contains(text(),'Sellable Qty')]");
    }
    get minQty()
    {
        return browser.element("//input[@id='minQty']");
    }
    get maxQty()
    {
        return browser.element("//input[@id='maxQty']");
    }
    get filterButton()
    {
        return browser.element("//button[@class='btn btn-primary btn-sm filter-btn']");
    }
    get product()
    {
        return browser.element("//a[contains(text(),'Dreambolic Always-Look-On-The-Bright-Side-Prints Wall Clock')]");
    }
    get stock()
    {
        return browser.element("//table[@class='table table-hover']/tbody/tr[3]/td[4]");
    }
    get skuID()
    {
        return browser.element("//span[text()='DBWC413-WallClock']");
    }

    get paytmlogin()
    {
        return browser.element("//div[@class='col s11']/p/strong/a[text()='Log In']");

    }
    get paytmun()
    {
        return browser.element("//div[@id='authentication_form']/ul/li/input[@id='authentication_email']");
    }
    get paytmsign()
    {
        return browser.element("//button[@class='isReturning isTransitionToSecondary']");
    }
    get paytmpwd()
    {
        return browser.element("//input[@id='authentication_password']");
    }
    get paytmsignin()
    {
        return browser.element("//button[@class='isReturning isTransitionToSecondary']");
    }
    get catalogue()
    {
        return browser.element("//span[text()='Catalogue']");
    }
    get selectfilter()
    {
        return browser.element("//select[@class='block']");
    }
    get merchantSKUID()
    {
        return browser.element("//option[text()='Seller SKU ID']");
    }
    get searchbymerchantSKUID()
    {
        return browser.element("//input[@type='text']");
    }
    get submitbtn()
    {
        return browser.element("//button[@class='waves-effect waves-light btn']");
    }
    get paytmstockleft()
    {
        return browser.element("//li[@class='col s3']/b");
    }

    get paytmLogout()
    {
        return browser.element("//div[@class='inline rel user nodetail']/i");
    }

    get signoutButton()
    {
        return browser.element("//a[@class='center']");
    }

    stockBT()
    {
        this.inventoryMenu.click();
        browser.pause(15000);
        this.sellableQty.click();
        browser.pause(3000);
        this.minQty.addValue(0);
        this.maxQty.addValue(0);
        this.filterButton.click();
        browser.pause(8000);
        this.product.click();
        browser.pause(5000);
        BTStock=parseInt(this.stock.getText());
        id = this.skuID.getText();
    }

    logoutFromPaytm()
    {
        browser.pause(6000);
        this.paytmLogout.moveToObject();
        browser.pause(5000);
        this.signoutButton.click();
    }



    stockPaytm(paytmurl,un,pwd)
    {
        this.stockBT();
        browser.url(paytmurl);
        browser.pause(3000);
        this.paytmlogin.click();
        browser.pause(8000);
        console.log(browser.getUrl());
        browser.switchTab(browser.windowHandles().value[1]);
        browser.pause(5000);
        this.paytmun.setValue(un);
        this.paytmsign.click();
        browser.pause(3000);
        this.paytmpwd.setValue(pwd);
        browser.pause(3000);
        this.paytmsignin.click();
        browser.switchTab(browser.windowHandles().value[0]);
        browser.pause(20000);
        this.catalogue.click();
        browser.pause(12000);
        this.selectfilter.click();
        browser.pause(3000);
        this.merchantSKUID.click();
        browser.pause(3000);
        this.searchbymerchantSKUID.addValue(id);
        browser.pause(7000);
        this.submitbtn.click();
        browser.pause(10000);
        paytmStock=parseInt(this.paytmstockleft.getText());
       // this.logoutFromPaytm();
        quantity[0]=BTStock;
        quantity[1]=paytmStock;

        return quantity;


    }
}
module.exports = Zero;