/**
 * Created by Bibhu on 17-01-2017.
 */
var timeAndReason=[];
class ActivitiesLog
{
    get inventoryMenu()
    {
        return browser.element("//div[contains(text(),'Inventory')]");
    }

    get product()
    {
        return browser.element("//a[contains(text(),'Dreambolic Fckn Mobile Back Cover')]");
    }
    get totalStock()
    {
        return browser.element("//span[text()='Total Stock:']/../span[6]");
    }

    get qtyOnChannel()
    {
        return browser.element("//table[@class='table table-hover']/tbody/tr[3]/td[4]");
    }
    get skuID()
    {
        return browser.element("//span[text()='SKU Code:']/../span[4]");
    }

    get activities()
    {
        return browser.element("//a[text()='Activities']");
    }
    get searchSkuId()
    {
        return browser.element("//input[@id='token-input-searchBySku']");
    }

    get timestamp()
    {
        return browser.element("//table[@class='table table-condensed']/tbody/tr[1]/td[7]");
    }
    get message()
    {
        return browser.element("//div[@class='comment more']");
    }

    get channel()
    {
        return browser.element("//a[@class='btn btn-default dropdown-toggle channel_filter_drop']");
    }
    get flipkart()
    {
        return browser.element("//input[@class='pull-left channel_filter' and @data-title='Flipkart']");
    }
    get filter()
    {
        return browser.element("(//div[@class='text-center'])[1]/button");
    }
    resonsAndTimeOfFailure()
    {
        this.inventoryMenu.click();
        browser.pause(10000);
        this.product.click();
        browser.pause(5000);
        var SKUID=this.skuID.getText();
        var TotalStock=parseInt(this.totalStock.getText());
        var QtyOnChannel=parseInt(this.qtyOnChannel.getText());

        if(TotalStock!=QtyOnChannel)
        {
            this.activities.click();
            browser.pause(10000);
            this.searchSkuId.addValue(SKUID);
            browser.pause(20000);
            browser.keys("Enter");
            browser.pause(5000);
            this.channel.click();
            browser.pause(3000);
            this.flipkart.click();
            browser.pause(3000);
            this.filter.click();
            browser.pause(4000);
            timeAndReason[0]= this.timestamp.getText();
            timeAndReason[1]= this.message.getText();

        }
        return timeAndReason;
    }

}
module.exports=ActivitiesLog;