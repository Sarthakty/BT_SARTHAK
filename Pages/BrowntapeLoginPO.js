/**
 * Created by Bibhu on 13-01-2017.
 */
class BTLogin
{

    get userName()
    {
        return browser.element("//input[@id='UserEmail']");
    }

    get password()
    {
        return browser.element("//input[@id='UserPassword']");
    }

    get signin()
    {
        return browser.element("//input[@id='submit-btn']");
    }

    brownTapeLogin(un, pwd)
    {
        this.userName.setValue(un);
        this.password.setValue(pwd);
        this.signin.click();

    }

}
module.exports = BTLogin;
