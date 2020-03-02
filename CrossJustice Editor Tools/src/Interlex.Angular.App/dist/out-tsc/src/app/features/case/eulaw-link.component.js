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
import { IEulawLink, importance, emptyBaseEuParts } from '../../models/case-editor.model';
var EulawLinkComponent = /** @class */ (function () {
    function EulawLinkComponent(http) {
        this.http = http;
        this.emptyParts = emptyBaseEuParts;
        this.importances = importance;
    }
    EulawLinkComponent.prototype.ngOnInit = function () {
    };
    EulawLinkComponent.prototype.onChange = function (event) {
        if (+this.euLink.docType === 4) {
            this.euLink.celex = '32012R1215';
            return;
        }
        if (+this.euLink.docType === 5) {
            this.euLink.celex = '32001R0044';
            return;
        }
        if (+this.euLink.docType === 6) {
            this.euLink.celex = '32008R0593';
            return;
        }
        if (+this.euLink.docType === 7) {
            this.euLink.celex = '32007R0864';
            return;
        }
        var letter = 'R';
        if (+this.euLink.docType === 1) {
            letter = 'R';
        }
        if (+this.euLink.docType === 2) {
            letter = 'L';
        }
        if (this.euLink.year && this.euLink.docNumber) {
            this.euLink.celex = '3' + this.euLink.year.toString() + letter.toString() + this.euLink.docNumber.toString().padStart(4, '0');
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", IEulawLink)
    ], EulawLinkComponent.prototype, "euLink", void 0);
    EulawLinkComponent = __decorate([
        Component({
            selector: 'app-eulaw-link',
            templateUrl: 'eulaw-link.component.html',
            styleUrls: ['./eulaw-link.component.css']
        }),
        __metadata("design:paramtypes", [HttpService])
    ], EulawLinkComponent);
    return EulawLinkComponent;
}());
export { EulawLinkComponent };
//# sourceMappingURL=eulaw-link.component.js.map