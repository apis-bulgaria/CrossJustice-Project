var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './services/http.service';
import { MenubarModule } from 'primeng/menubar';
import { NavigationComponent } from './navigation/navigation.component';
import { InputTextareaModule, InputTextModule, SplitButtonModule, ToolbarModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/calendar';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './services/alert.service';
import { AuthGuard } from './guards/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { EditorModule } from 'primeng/editor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ToastModule } from 'primeng/toast';
var CoreModule = /** @class */ (function () {
    function CoreModule(parentModule) {
        if (parentModule) {
            throw new Error('Core module is already loaded. Import it in the AppModule only!');
        }
    }
    CoreModule = __decorate([
        NgModule({
            imports: [
                InputTextModule,
                InputTextareaModule,
                CalendarModule,
                EditorModule,
                CommonModule,
                MenubarModule,
                ToolbarModule,
                SplitButtonModule,
                ToastModule
            ],
            declarations: [NavigationComponent, AlertComponent],
            providers: [HttpService, AlertService, AuthGuard, {
                    provide: HTTP_INTERCEPTORS,
                    useClass: ErrorInterceptor,
                    multi: true
                },
                { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
            exports: [NavigationComponent, AlertComponent]
        }),
        __param(0, Optional()), __param(0, SkipSelf()),
        __metadata("design:paramtypes", [CoreModule])
    ], CoreModule);
    return CoreModule;
}());
export { CoreModule };
//# sourceMappingURL=core.module.js.map