/**
 * Created by Bibhu on 13-01-2017.
 */
var num=null;
var num1=null;
var number=[];

class TotalList
{
    get inventoryMenu()
    {
        return browser.element("//div[contains(text(),'Inventory')]");
    }
    get listingWatch()
    {
        return browser.element("//a[contains(text(),'Listing Watch')]");

    }
    get list()
    {
        return browser.element("//span[text()='Total Listing']/../../td[2]//a");
    }

    get userName()
    {
        return browser.element("//label[text()='Email/Mobile Number']/../input");
    }
    get passWord()
    {
        return browser.element("//input[@id='j_id0:navbar:txtPassword']");
    }
    get Login()
    {
        return browser.element("//input[@class='sf-button-secondary login-btn text-uppercase']");
    }
    get popup()
    {
        return browser.element("//div[contains(text(),'No, Thanks!')]");
    }
    get catalog()
    {
        return browser.element("//a[contains(text(),'Catalog')]");
    }
    get snapdealList()
    {
        return browser.element("//span[@ng-show='cat.liveCount>= 0 || cat.liveCountGlobal >= 0']");
    }


    listBT()
    {
        this.inventoryMenu.click();
        browser.pause(5000);
        this.listingWatch.click();
        num=parseInt(this.list.getText());
    }

    listSnapdeal(SDURL,UN,PWD)
    {
        this.listBT();
        browser.url(SDURL);
        this.userName.addValue(UN);
        this.passWord.addValue(PWD);
        this.Login.click();
        browser.pause(10000);
        this.popup.click();
        browser.pause(5000);
        this.catalog.click();
        browser.pause(10000);
        var a=this.snapdealList.getText();
        var  num1=parseInt(a.substring(a.indexOf("(")+1,a.indexOf(")")));

            number[0]=num;
            number[1]=num1;

            return number;

     }

};

module.exports=TotalList;