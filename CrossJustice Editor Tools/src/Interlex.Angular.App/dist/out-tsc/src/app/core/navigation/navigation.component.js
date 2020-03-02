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
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
var NavigationComponent = /** @class */ (function () {
    function NavigationComponent(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    NavigationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.items = [
            // {
            //   label: 'Case editor',
            //   icon: 'pi pi-fw pi-pencil',
            //   routerLink: ['caseeditor']
            // },
            {
                label: 'Case list',
                icon: 'pi pi-fw pi-file',
                routerLink: ['caselist']
            },
        ];
        this.loggedInInfo = this.auth.getLoggedInStatus().subscribe(function (flag) {
            _this.items = _this.items.filter(function (x) { return x.label !== 'Admin'; });
            if (flag) {
                _this.username = _this.auth.getUsername();
                _this.loggedIn = true;
                if (_this.auth.isAdmin()) {
                    _this.items.push({ label: 'Admin', routerLink: ['admin'] });
                }
            }
            else {
                _this.username = 'Anonymous';
                _this.loggedIn = false;
            }
        });
    };
    NavigationComponent.prototype.logout = function () {
        this.auth.logout();
        this.router.navigate(['/login']);
    };
    NavigationComponent.prototype.ngOnDestroy = function () {
        this.loggedInInfo.unsubscribe();
    };
    NavigationComponent = __decorate([
        Component({
            selector: 'app-navigation',
            templateUrl: './navigation.component.html',
            styleUrls: ['./navigation.component.css']
        }),
        __metadata("design:paramtypes", [AuthService, Router])
    ], NavigationComponent);
    return NavigationComponent;
}());
export { NavigationComponent };
//# sourceMappingURL=navigation.component.js.map