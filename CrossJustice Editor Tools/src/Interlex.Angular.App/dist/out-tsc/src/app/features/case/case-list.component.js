var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { HttpService } from '../../core/services/http.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from '../../core/services/auth.service';
import { ConfirmationService } from 'primeng/api';
var CaseListComponent = /** @class */ (function () {
    function CaseListComponent(http, router, alertService, auth, confirmation) {
        this.http = http;
        this.router = router;
        this.alertService = alertService;
        this.auth = auth;
        this.confirmation = confirmation;
        this.loading = false;
    }
    CaseListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isAdmin = this.auth.isAdmin();
        this.isSuperAdmin = this.auth.isSuperAdmin();
        this.cols = [
            { field: 'userName', header: 'User' },
            { field: 'title', header: 'Case title' },
            { field: 'lastChange', header: 'Date' },
            { field: 'organization', header: 'Organization' },
        ];
        this.requestModel = {
            userName: '',
            pageNumber: 0,
            count: 0,
            organization: ''
        };
        if (this.isSuperAdmin) {
            this.http.get('organization/GetOrganizationNames').subscribe(function (x) {
                _this.organizations = x;
            });
        }
        this.getCasesListFromApi();
    };
    CaseListComponent.prototype.getCasesListFromApi = function () {
        this.loading = true;
        this.makeApiCall();
    };
    CaseListComponent.prototype.filterCases = function () {
        if (this.selectedOrg && this.selectedOrg.shortName) {
            this.requestModel.organization = this.selectedOrg.shortName;
        }
        else {
            this.requestModel.organization = '';
        }
        // if (!this.requestModel.organization && !this.requestModel.userName) {
        //   return;
        // }
        this.getCasesListFromApi();
    };
    CaseListComponent.prototype.editCase = function (rowData) {
        this.router.navigate(['caseeditor', rowData.caseId]);
    };
    CaseListComponent.prototype.deleteCase = function (rowData) {
        var _this = this;
        this.confirmation.confirm({
            message: 'Do you want to delete this record?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: function () {
                _this.http.post("case/DeleteCase/" + rowData.caseId, null)
                    .subscribe(function (x) {
                    _this.alertService.success('Deleted successfully.');
                    _this.getCasesListFromApi();
                }, function (err) {
                    _this.alertService.error(err.error);
                });
            },
            reject: function () {
            }
        });
    };
    CaseListComponent.prototype.addNewCase = function () {
        this.router.navigate(['caseeditor']);
    };
    CaseListComponent.prototype.makeApiCall = function () {
        var _this = this;
        this.http.post('./case/GetCasesList', this.requestModel).subscribe(function (data) {
            _this.cases = data;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
            _this.alertService.error(error.message);
        });
    };
    CaseListComponent.prototype.onOrganizationChange = function (event) {
        this.filterCases();
    };
    CaseListComponent = __decorate([
        Component({
            selector: 'app-case-list',
            templateUrl: 'case-list.component.html',
            styleUrls: ['./case-list.component.css'],
            providers: [ConfirmationService]
        }),
        __metadata("design:paramtypes", [HttpService, Router, AlertService, AuthService,
            ConfirmationService])
    ], CaseListComponent);
    return CaseListComponent;
}());
export { CaseListComponent };
//# sourceMappingURL=case-list.component.js.map