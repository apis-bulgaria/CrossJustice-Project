var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { ButtonModule } from 'primeng/button';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CaseEditorComponent } from './case/case-editor.component';
import { CalendarModule } from 'primeng/calendar';
import { EditorModule } from 'primeng/editor';
import { EulawLinkComponent } from './case/eulaw-link.component';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule, CardModule, ChipsModule, ConfirmDialogModule, InputTextModule, OverlayPanelModule, TreeModule } from 'primeng/primeng';
import { CaseListComponent } from './case/case-list.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { EurovocTreeComponent } from './case/eurovoc-tree.component';
import { CheckboxModule } from 'primeng/checkbox';
import { EucaseLinkComponent } from './case/eucase-link.component';
import { EulinkPartPipe } from './case/eulaw-link-parts.pipe';
import { EucasePartPipe } from './case/eucase-link-parts.pipe';
import { RegisterUserComponent } from './admin/register-user/register-user.component';
var FeaturesModule = /** @class */ (function () {
    function FeaturesModule() {
    }
    FeaturesModule = __decorate([
        NgModule({
            imports: [
                FormsModule,
                CommonModule,
                SharedModule,
                ButtonModule,
                ReactiveFormsModule,
                RouterModule,
                CalendarModule,
                EditorModule,
                DialogModule,
                DropdownModule,
                TableModule,
                ConfirmDialogModule,
                RadioButtonModule,
                TreeModule,
                OverlayPanelModule,
                InputTextModule,
                RadioButtonModule,
                CheckboxModule,
                CardModule,
                ChipsModule,
                AutoCompleteModule
            ],
            declarations: [HomeComponent, AdminComponent, LoginComponent, CaseEditorComponent,
                EulawLinkComponent, CaseListComponent, EurovocTreeComponent, EucaseLinkComponent,
                EulinkPartPipe, EucasePartPipe, RegisterUserComponent],
        })
    ], FeaturesModule);
    return FeaturesModule;
}());
export { FeaturesModule };
//# sourceMappingURL=features.module.js.map