var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { RouterModule } from '@angular/router';
import { AdminComponent } from './features/admin/admin.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/login/login.component';
import { CaseEditorComponent } from './features/case/case-editor.component';
import { CaseListComponent } from './features/case/case-list.component';
import { RegisterUserComponent } from './features/admin/register-user/register-user.component';
import { AdminGuard } from './core/guards/admin.guard';
var appRoutes = [
    { path: '', redirectTo: 'caselist', pathMatch: 'full' },
    // {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'caseeditor', component: CaseEditorComponent, canActivate: [AuthGuard], data: { animation: 'Caseeditor' } },
    { path: 'caseeditor/:id', component: CaseEditorComponent, canActivate: [AuthGuard], data: { animation: 'Caseeditor' } },
    { path: 'caselist', component: CaseListComponent, canActivate: [AuthGuard], data: { animation: 'Caselist' } },
    { path: 'admin', component: AdminComponent, canActivate: [AdminGuard], data: { animation: 'Admin' } },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterUserComponent, canActivate: [AdminGuard], data: { animation: 'Register' } }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(appRoutes, { enableTracing: false, useHash: true } // <-- debugging purposes only set to true
                )
            ],
            exports: [
                RouterModule
            ]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map