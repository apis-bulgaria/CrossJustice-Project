import { environment } from '../../environments/environment';
var Constants = /** @class */ (function () {
    function Constants() {
    }
    // public static API_BASE = 'https://localhost:44388/api/';
    // public static get API_BASE(): string { return environment.apiBaseUrl; } // 'http://192.168.2.16:8008/webapi/api/';
    Constants.API_BASE = environment.apiBaseUrl; // 'http://192.168.2.16:8008/webapi/api/';
    return Constants;
}());
export { Constants };
//# sourceMappingURL=constants.js.map