/**
 * Created by BIBHU on 17-Jan-17.
 */
var log4js = require('log4js');
log4js.loadAppender('file');
var fs = require('fs');
var dir = null;

class LOG
{
    createLogFolder()
    {

        var contents = fs.readFileSync("PropertiesFile/config.json");
        var jsonContent = JSON.parse(contents);
        console.log("currentDateAndTime:", jsonContent.currentDateAndTime);
        dir = 'logs/Run_'+jsonContent.currentDateAndTime;

        if (!fs.existsSync(dir))
        {
            fs.mkdirSync(dir);
        }
    }

    logger(logFileName)
    {

        log4js.addAppender(log4js.appenders.file(dir+'/'+logFileName+'.log'),'log');
        var logger = log4js.getLogger('log');
        logger.setLevel('INFO');
        logger.setLevel('DEBUG');
        return logger;
    }


}

module.exports=new LOG();