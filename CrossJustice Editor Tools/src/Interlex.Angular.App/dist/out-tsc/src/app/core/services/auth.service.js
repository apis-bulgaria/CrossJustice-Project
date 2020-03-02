var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';
import { UserPrivileges } from '../../models/user.model';
import { BehaviorSubject } from 'rxjs';
var AuthService = /** @class */ (function () {
    function AuthService(http) {
        this.http = http;
        this.loggedIn = false; // alternative to checking localstorage?
        this.subject = new BehaviorSubject(this.isLoggedIn());
    }
    AuthService.prototype.login = function (username, password) {
        var _this = this;
        return this.http.post('auth/login', { username: username, password: password })
            .pipe(map(function (user) {
            if (user && user.token) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                _this.subject.next(true);
            }
            return user;
        }));
    };
    AuthService.prototype.logout = function () {
        localStorage.removeItem('currentUser');
        this.subject.next(false);
    };
    AuthService.prototype.isLoggedIn = function () {
        return localStorage.getItem('currentUser') !== null;
    };
    AuthService.prototype.isAdmin = function () {
        var user = localStorage.getItem('currentUser');
        if (user) {
            var parsedUser = JSON.parse(user);
            if (parsedUser.privileges === UserPrivileges.Admin || parsedUser.privileges === UserPrivileges.SuperAdmin) {
                return true;
            }
        }
        return false;
    };
    AuthService.prototype.isSuperAdmin = function () {
        var user = localStorage.getItem('currentUser');
        if (user) {
            var parsedUser = JSON.parse(user);
            if (parsedUser.privileges === UserPrivileges.SuperAdmin) {
                return true;
            }
        }
        return false;
    };
    AuthService.prototype.getUsername = function () {
        var user = localStorage.getItem('currentUser');
        if (user) {
            var parsed = JSON.parse(user);
            return parsed.username;
        }
    };
    AuthService.prototype.getToken = function () {
        var user = localStorage.getItem('currentUser');
        if (user) {
            var parsed = JSON.parse(user);
            return parsed.token;
        }
    };
    AuthService.prototype.getLoggedInStatus = function () {
        return this.subject.asObservable();
    };
    AuthService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpService])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map