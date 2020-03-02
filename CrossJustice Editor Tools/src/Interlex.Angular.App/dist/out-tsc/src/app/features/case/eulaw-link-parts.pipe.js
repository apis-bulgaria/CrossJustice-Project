var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
var EulinkPartPipe = /** @class */ (function () {
    function EulinkPartPipe() {
    }
    EulinkPartPipe.prototype.transform = function (value) {
        var res = '';
        if (value.itemsOther && value.itemsOther.length > 0) {
            value.itemsOther.forEach(function (item) {
                if (item.value && item.value !== '') {
                    res += item.hrefPart + ' ' + item.value + ' ';
                }
            });
        }
        if (value.itemsBase && value.itemsBase.length > 0) {
            value.itemsBase.forEach(function (item) {
                if (item.value && item.value !== '') {
                    res += item.hrefPart + ' ' + item.value + ' ';
                }
            });
        }
        return res;
    };
    EulinkPartPipe = __decorate([
        Pipe({ name: 'eulinkPart' })
    ], EulinkPartPipe);
    return EulinkPartPipe;
}());
export { EulinkPartPipe };
//# sourceMappingURL=eulaw-link-parts.pipe.js.map