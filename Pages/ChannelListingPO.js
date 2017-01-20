/**
 * Created by CBT on 12-01-2017.
 */
var arr=[];
class Listing
{

    get inventoryMenu()
    {
        return browser.element("//div[contains(text(),'Inventory')]");
    }
    get product()
    {
        return browser.element("//a[contains(text(),'Dreambolic sync and charge cable for Android(black)')]");
    }
    get redifshop()
    {
        return browser.element("//td[contains(text(),'Rediff Shopping')]");
    }
    get amazonindia()
    {
        return browser.element("//td[contains(text(),'Amazon India')]");
    }
    get flipkart()
    {
        return browser.element("//td[contains(text(),'Flipkart')]");
    }
    get skuID()
    {
        return browser.element("//span[text()='SKU Code:']/../span[4]");
    }
    get listingWatch()
    {
        return browser.element("//a[contains(text(),'Listing Watch')]");

    }
    get entercode()
    {
        return browser.element("//input[@class='input-xsmall search' and @data-type='custom_code']");

    }
    get redifshoplist()
    {
        return browser.element("//table[@class='table table-condensed']/tbody/tr[3]/td[1]");
    }
    get amazonindialist()
    {
        return browser.element("//table[@class='table table-condensed']/tbody/tr[2]/td[1]");
    }
    get flipkartlist()
    {
        return browser.element("//table[@class='table table-condensed']/tbody/tr[1]/td[1]");
    }


    channellist()
    {
        var count=0;

        this.inventoryMenu.click();
        browser.pause(6000);
        this.product.click();
        var channelsOnInventory=[this.redifshop.getText(),this.amazonindia.getText(),this.flipkart.getText()];
        var id = this.skuID.getText();
        this.listingWatch.click();
        browser.pause(5000);
        this.entercode.addValue(id);
        browser.keys("Enter");
        browser.pause(8000);
        var channelsOnProductDetails=[this.amazonindialist.getText(),this.redifshoplist.getText(),this.flipkartlist.getText()];
        for(var i=0;i<channelsOnInventory.length;i++)
        {
            for(var j=0;j<channelsOnProductDetails.length;j++)
            {
                if (channelsOnInventory[i] == channelsOnProductDetails[j])
                {
                    count++;
                }
            }
        }
         arr[0]=count;
         arr[1]=channelsOnInventory.length;

        return arr;

    }

}
module.exports = Listing;