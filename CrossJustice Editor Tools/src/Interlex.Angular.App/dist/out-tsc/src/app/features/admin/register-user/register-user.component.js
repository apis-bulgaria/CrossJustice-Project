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
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../../core/services/http.service';
import { AlertService } from '../../../core/services/alert.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
var RegisterUserComponent = /** @class */ (function () {
    function RegisterUserComponent(http, alert, fb, auth, router) {
        this.http = http;
        this.alert = alert;
        this.fb = fb;
        this.auth = auth;
        this.router = router;
    }
    RegisterUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isSuperAdmin = this.auth.isSuperAdmin();
        if (this.isSuperAdmin) {
            this.http.get('organization/GetOrganizationNames').subscribe(function (x) {
                _this.organizations = x;
            });
        }
        this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])\S{6,}$/)]],
            confirmPassword: ['' /*, [Validators.pattern(/^(?=.*[a-z])(?=.*[\d])\w{6,}$/)]*/],
            privileges: [0],
            organization: ['']
        }, { validator: this.passwordMatchValidator });
    };
    RegisterUserComponent.prototype.passwordMatchValidator = function (control) {
        var password = control.get('password');
        var confirmPassword = control.get('confirmPassword');
        if (password && confirmPassword && password.value !== confirmPassword.value) {
            confirmPassword.setErrors({ 'passwordMismatch': true });
        }
        else {
            return null;
        }
    };
    Object.defineProperty(RegisterUserComponent.prototype, "f", {
        get: function () {
            return this.loginForm.controls;
        },
        enumerable: true,
        configurable: true
    });
    RegisterUserComponent.prototype.submit = function () {
        var _this = this;
        if (this.loginForm.invalid) {
            return;
        }
        this.http.post('users/RegisterUser', this.loginForm.value).subscribe(function (x) {
            _this.alert.success('User registered!');
            _this.router.navigate(['/admin']);
        }, function (err) {
            _this.alert.error(JSON.stringify(err.error));
        });
    };
    RegisterUserComponent = __decorate([
        Component({
            selector: 'app-register-user',
            templateUrl: './register-user.component.html',
            styleUrls: ['./register-user.component.css']
        }),
        __metadata("design:paramtypes", [HttpService, AlertService,
            FormBuilder, AuthService, Router])
    ], RegisterUserComponent);
    return RegisterUserComponent;
}());
export { RegisterUserComponent };
//# sourceMappingURL=register-user.component.js.map