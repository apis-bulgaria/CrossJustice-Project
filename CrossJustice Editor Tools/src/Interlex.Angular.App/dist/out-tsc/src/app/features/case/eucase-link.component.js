var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { HttpService } from '../../core/services/http.service';
import { IEucaseLink, importance, yesNoRule } from '../../models/case-editor.model';
var EucaseLinkComponent = /** @class */ (function () {
    function EucaseLinkComponent(http) {
        this.http = http;
        this.courts = [
            { label: 'Court of Justice', code: 'C' },
            { label: 'General Court', code: 'T' },
            { label: 'Civil Service Tribunal', code: 'F' }
        ];
        this.docTypes = [
            { label: 'Judgment', code: 'J' },
            { label: 'Order', code: 'O' },
            { label: 'Opinion of the Advocate-General', code: 'C' }
        ];
        this.importances = importance;
        this.prelRuling = yesNoRule;
    }
    EucaseLinkComponent.prototype.ngOnInit = function () {
    };
    EucaseLinkComponent.prototype.onChange = function (event) {
        if (this.euCaseLink.docNumber && this.euCaseLink.year && this.euCaseLink.court && this.euCaseLink.docType) {
            var dtLetter = this.euCaseLink.docType.code;
            var cLetter = this.euCaseLink.court.code;
            var docNumber = this.euCaseLink.docNumber.toString().padStart(4, '0');
            this.euCaseLink.celex = '6' + this.euCaseLink.year + cLetter + dtLetter + docNumber;
        }
        else {
            this.euCaseLink.celex = '';
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", IEucaseLink)
    ], EucaseLinkComponent.prototype, "euCaseLink", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], EucaseLinkComponent.prototype, "isDoc", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], EucaseLinkComponent.prototype, "isEuDoc", void 0);
    EucaseLinkComponent = __decorate([
        Component({
            selector: 'app-eucase-link',
            templateUrl: 'eucase-link.component.html',
            styleUrls: [
                '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
                './eucase-link.component.css'
            ]
        }),
        __metadata("design:paramtypes", [HttpService])
    ], EucaseLinkComponent);
    return EucaseLinkComponent;
}());
export { EucaseLinkComponent };
//# sourceMappingURL=eucase-link.component.js.map