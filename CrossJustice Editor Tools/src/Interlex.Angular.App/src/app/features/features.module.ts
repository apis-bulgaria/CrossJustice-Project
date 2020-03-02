import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {HomeComponent} from './home/home.component';
import {AdminComponent} from './admin/admin.component';
import {ButtonModule} from 'primeng/button';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CaseEditorComponent} from './case/case-editor.component';
import {CalendarModule} from 'primeng/calendar';
import {EditorModule} from 'primeng/editor';
import {EulawLinkComponent} from './case/eulaw-link.component';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {
  AutoCompleteModule,
  CardModule,
  ChipsModule,
  ConfirmDialogModule, FileUploadModule,
  InputTextModule, MultiSelectModule,
  OverlayPanelModule,
  TreeModule,
  TreeTableModule,
  PanelModule,
  FieldsetModule,
  InputSwitchModule
} from 'primeng/primeng';
import {CaseListComponent} from './case/case-list.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import {EurovocTreeComponent} from './case/eurovoc-tree.component';
import {CheckboxModule} from 'primeng/checkbox';
import {EucaseLinkComponent} from './case/eucase-link.component';
import {EulawHrefPipe, EulinkPartPipe, NatLawPart, NatLinkPartPipe} from './case/eulaw-link-parts.pipe';
import {EucaseHrefPipe, EucasePartPipe, EucasePreliminaryRuling} from './case/eucase-link-parts.pipe';
import {RegisterUserComponent} from './admin/register-user/register-user.component';
import {EditUserComponent} from './admin/edit-user/edit-user.component';
import {ResetUserComponent} from './admin/reset-user/reset-user.component';
import {SuggestionsComponent} from './admin/suggestions/suggestions.component';
import {HelpComponent} from "./help/help.component";
import {MetadataComponent} from "./case/metadata.component";
import {MetadataListComponent} from './case/metadata-list.component';
import {ExpertListComponent} from "./expert-list/expert-list.component";
import {ExpertComponent} from "./expert-list/expert.component";
import {TranspositionTableComponent} from './transposition/transp-table.component';
import {TranspositionProvisionComponent} from './transposition/add-edit-provision.component';
import {TranspositionPartComponent} from './transposition/add-edit-part.component';
import {NatActViewComponent} from './transposition/transp-nat-act-view.component';
import {NatlawLinkComponent} from "./natlaw-link/natlaw-link.component";
import {DirectiveNamePipe, DirectiveItemTranspose} from './transposition/directive-name.pipe';

@NgModule({
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
    MultiSelectModule,
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
    AutoCompleteModule,
    TreeTableModule,
    FileUploadModule,
    PanelModule,
    FieldsetModule,
    InputSwitchModule
  ],
  declarations: [HomeComponent, AdminComponent, LoginComponent, CaseEditorComponent,
    EulawLinkComponent, CaseListComponent, EurovocTreeComponent, EucaseLinkComponent, NatlawLinkComponent,
    EulinkPartPipe, NatLawPart, EucasePartPipe, RegisterUserComponent, EulawHrefPipe,
    EucasePreliminaryRuling, EucaseHrefPipe, EditUserComponent, ResetUserComponent, SuggestionsComponent, HelpComponent,
    MetadataComponent, MetadataListComponent, ExpertListComponent, ExpertComponent, TranspositionTableComponent,
    TranspositionProvisionComponent,
    TranspositionPartComponent, NatLinkPartPipe, NatActViewComponent, DirectiveNamePipe, DirectiveItemTranspose
  ],
})
export class FeaturesModule {
}
