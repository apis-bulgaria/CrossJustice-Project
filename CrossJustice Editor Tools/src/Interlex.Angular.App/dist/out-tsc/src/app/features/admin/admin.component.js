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
import { ConfirmationService } from 'primeng/api';
import { AlertService } from '../../core/services/alert.service';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
var AdminComponent = /** @class */ (function () {
    function AdminComponent(http, confirmation, alert, fb, auth, router) {
        this.http = http;
        this.confirmation = confirmation;
        this.alert = alert;
        this.fb = fb;
        this.auth = auth;
        this.router = router;
        this.users = [];
    }
    AdminComponent.prototype.ngOnInit = function () {
        this.getUsers();
    };
    AdminComponent.prototype.confirmDeactivate = function (username) {
        var _this = this;
        this.confirmation.confirm({
            message: 'Do you want to deactivate this user?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: function () {
                _this.http.post('users/DeactivateUser', { username: username })
                    .subscribe(function (res) {
                    _this.alert.success('User deactivated');
                    _this.getUsers();
                });
            },
            reject: function () {
            }
        });
    };
    AdminComponent.prototype.confirmActivate = function (username) {
        var _this = this;
        this.confirmation.confirm({
            message: 'Do you want to activate this user?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: function () {
                _this.http.post('users/ActivateUser', { username: username })
                    .subscribe(function (res) {
                    _this.alert.success('User activated');
                    _this.getUsers();
                });
            },
            reject: function () {
            }
        });
    };
    AdminComponent.prototype.getUsers = function () {
        var _this = this;
        this.http.get('users/GetUsers').subscribe(function (users) {
            _this.users = users;
        });
    };
    AdminComponent.prototype.registerUser = function () {
        this.router.navigate(['register']);
    };
    AdminComponent = __decorate([
        Component({
            selector: 'app-admin',
            templateUrl: './admin.component.html',
            styleUrls: ['./admin.component.css'],
            providers: [ConfirmationService]
        }),
        __metadata("design:paramtypes", [HttpService, ConfirmationService, AlertService,
            FormBuilder, AuthService, Router])
    ], AdminComponent);
    return AdminComponent;
}());
export { AdminComponent };
//# sourceMappingURL=admin.component.js.map