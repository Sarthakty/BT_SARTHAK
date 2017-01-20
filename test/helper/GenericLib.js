/**
 * Created by BIBHU on 17-Jan-17.
 */
var xlsx = require('node-xlsx');
var temp = null;
class GenericPage
{

    loadURL(url)
    {
        browser.url(url);
    }


    excelReadingData(fileName, sheetName, TcID)
    {
        var da = xlsx.parse(fileName);
        for (var i = 0; i <= da.length - 1; i++)
        {
            var getSheetName = da[i].name;
            if (getSheetName == sheetName)
            {
                for (var j = 0; j <= da[i].data.length - 1; j++)
                {
                    temp = da[i].data[j];
                    if (temp[0] == TcID)
                    {
                        break;
                    }
                }

            }
        }
        return temp;
    }
}
module.exports = GenericPage;

