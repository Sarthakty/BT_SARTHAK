/**
 * Created by Bibhu on 18-01-2017.
 */
class Comparing
{

    get inventoryMenu()
    {
        return browser.element("//div[contains(text(),'Inventory')]");
    }

    get product()
    {
        return browser.element("//a[contains(text(),'Dreambolic sync and charge cable for iphone(black)')]");
    }
    get qtyonChannnel()
    {
        return browser.element("//td[contains(text(),'Flipkart')]/../td[4]");
    }
    get dedicatedStock()
    {
        return browser.element("//td[contains(text(),'Flipkart')]/../td[7]");
    }

    compareQuantity()
    {
        this.inventoryMenu.click();
        browser.pause(5000);
        this.product.click();
        var qtyOnChannel=parseInt(this.qtyonChannnel.getText());
        var dedicatedStock=parseInt(this.dedicatedStock.getText());
        var compstock;
        if(qtyOnChannel<=dedicatedStock)
        {
            compstock="Pass";
        }
        else
        {
            compstock="Fail";
        }

        return compstock;
    }
}

module.exports=Comparing;