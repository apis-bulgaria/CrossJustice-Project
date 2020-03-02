export class BrowserHelper {
    public static checkBrowser() {
        const sUsrAg = navigator.userAgent;
        if (sUsrAg.indexOf('Trident') > -1) {
            return true;
        }
    }
}