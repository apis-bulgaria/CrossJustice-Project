import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertService} from '../../core/services/alert.service';
import {
  SmeDocItem,
  IDirectiveModel,
  SmeDoc,
  INationalAct,
  ICountryModel,
  ISaveTranspositionModel,
  SmeDocItemType, DirectiveLockModel, DirectiveTranspResponseModel
} from 'src/app/models/directive-models';
import {HttpService} from 'src/app/core/services/http.service';
import {SelectItem, ConfirmationService} from 'primeng/api';
import {DirectiveName} from './directive-name.pipe';
import {ILegislation} from "../../models/legislation.model";
import {NatlawLinkComponent} from "../natlaw-link/natlaw-link.component";
import {INomenclature, ISaveLegislation} from "../../models/case-editor.model";
import {BrowserHelper} from 'src/app/core/browser-helper';
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'transp-table',
  templateUrl: './transp-table.component.html',
  styleUrls: ['./transp-table.component.css']
})
export class TranspositionTableComponent implements OnInit {
  constructor(private alertService: AlertService, private http: HttpService, private confirmationService: ConfirmationService,
              private authService: AuthService) {
    this.isAdmin = authService.isAdmin();
  }

  browserName: any;
  isMSIE: boolean;
  //
  docItems: SmeDocItem[];
  canEdit = false;
  isAdmin: boolean;
  directiveDoc: SmeDoc;
  directiveList: IDirectiveModel[];
  countryList: ICountryModel[];
  selectedCountry: ICountryModel;
  legislationDropdown: ILegislation[];
  @ViewChild(NatlawLinkComponent, {static: false}) natLawComponent: NatlawLinkComponent;
  currentNatLawItem: ILegislation;
  natLawItemForEdit: { rowIndex: number, natIndex: number };
  selectedDirective: IDirectiveModel;
  actVisible = false;
  showAddComment = false;
  comment: string;
  smeDocItemForComment: SmeDocItem;
  selectedDocItem: SmeDocItem;
  selectedNationalAct: INationalAct;
  transTypes: SelectItem[] = [
    // { label: 'Select transposition Type', value: null },
    {label: 'Explicitly transposed', value: {code: '1', label: 'Explicitly transposed'}},
    {label: 'De facto/indirectly implemented', value: {code: '2', label: 'De facto/indirectly implemented'}},
    {
      label: 'No national implementation (either officially nor de facto/indirect)',
      value: {code: '3', label: 'No national implementation (either officially nor de facto/indirect)'}
    }
  ];

  tmpNationalAct: INationalAct;
  isIE: boolean;
  isTransPage: boolean;

  ngOnInit() {
    this.initModelFromApi();

    this.isIE = BrowserHelper.checkBrowser();
    const hostname = window.location.href;
    if (this.isIE === true && hostname.includes('transposition')) {
      return this.isTransPage = true;
    }

  }

  private initModelFromApi() {
    this.http.get('./data/GetDirectiveList').subscribe((data: IDirectiveModel[]) => {
      this.directiveList = data.map(x => ({...x, caption: DirectiveName.ToFriendlyName(x.celex)}));
      this.selectedDirective = this.directiveList[0];
      this.http.getCountries().subscribe(countries => {
        this.countryList = countries.filter(x => x.code !== 'EU');
        this.selectedCountry = this.countryList[0];
        this.getLegislationEntries(this.selectedCountry.code);
        this.reloadTable();
      });
    }, (error) => {
      this.alertService.error(error);
    });
  }

  getLegislationEntries(code: string) {
    this.http.get(`case/GetLegislationEntries/${code}`).subscribe((x: ILegislation[]) => {
      this.legislationDropdown = x;
    });
  }

  dropDownChange($event) {
    this.reloadTable();
  }

  dropDownCountryChange($event) {
    const code = $event.value.code;
    this.getLegislationEntries(code);
    this.reloadTable();
  }

  reloadTable() {
    if (this.selectedDirective) {
      this.http.get('./data/GetDirectiveTransposition/' + this.selectedDirective.celex + '/' + this.selectedCountry.id)
        .subscribe((x: DirectiveTranspResponseModel) => {
          const data = JSON.parse(x.content) as SmeDoc;
          this.directiveDoc = data;
          let artCnt = 0;
          data.items.forEach((x) => {
            if (x.type != SmeDocItemType.Letter && x.type != SmeDocItemType.Number && x.type != SmeDocItemType.Point
              && x.type != SmeDocItemType.SubParagraph && x.type != SmeDocItemType.Paragraph) {
              artCnt++;
            }
            x.colorId = artCnt;
            if (!x.transp) {
              // x.transp = this.transTypes[1].value;
              // x.type
              x.nationalActs = [];
            }
          });
          this.docItems = data.items;
          this.canEdit = x.isLockedByCurrentUser;
        }, (error) => {
          this.alertService.error(error);
        });
    }
  }

  getLeftMargin(item: SmeDocItem) {
    if (item) {
      return (item.treeLevel * 10).toString() + 'px';
    } else {
      return '0px';
    }
  }

  showDialog(item: SmeDocItem) {
    this.actVisible = true;
    this.natLawItemForEdit = null;
    this.currentNatLawItem = {};
    this.selectedDocItem = item;
    this.tmpNationalAct = {
      title: null,
      titleEn: null,
      isOfficialTranslation: {code: '1', label: 'Official'},
      provisions: []
    };
  }

  showAddCommentDialog(item: SmeDocItem) {
    this.comment = '';
    this.smeDocItemForComment = item;
    this.showAddComment = true;
  }

  saveComment() {
    this.showAddComment = false;
    this.smeDocItemForComment.comment = this.comment;
  }

  editAct(rowIndex: number, natIndex: number) {
    this.natLawItemForEdit = {rowIndex, natIndex};
    this.currentNatLawItem = {...this.docItems[rowIndex].nationalActs[natIndex]};
    this.actVisible = true;
  }

  public saveNatActInfo() {
    const res = this.natLawComponent.getNationalLawItem();
    if (res) {
      delete res.itemsBase;
      delete res.itemsOther;
      res.include = true;
      if (!this.selectedDocItem.nationalActs) {
        this.selectedDocItem.nationalActs = [];
      }
      if (this.natLawItemForEdit) {
        const {rowIndex, natIndex} = this.natLawItemForEdit;
        const itemToEdit = this.docItems[rowIndex].nationalActs[natIndex];
        itemToEdit.title = res.title;
        itemToEdit.titleEn = res.titleEn;
        itemToEdit.url = res.url;
        itemToEdit.eli = res.eli;
        itemToEdit.include = res.include;
      } else {
        this.selectedDocItem.nationalActs.push({...this.tmpNationalAct, ...res});
        this.saveLegislation(res);
      }
      this.actVisible = false;
    }
  }


  removeAct(docItem: SmeDocItem, act: INationalAct) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the national act?',
      accept: () => {
        //Actual logic to perform a confirmation
        if (docItem && act) {
          docItem.nationalActs = docItem.nationalActs.filter(x => x !== act);
        }
      }
    });
  }

  public saveTransposition() {
    if (this.directiveDoc && this.selectedDirective && this.selectedCountry) {
      const stModel: ISaveTranspositionModel = {
        celex: this.selectedDirective.celex,
        countryId: this.selectedCountry.id,
        content: JSON.stringify(this.directiveDoc)
      };
      this.http.post('./data/SaveTransposition/', stModel)
        .subscribe(() => {

          this.alertService.success('Document is saved');
        }, (err) => {
          this.alertService.error(err.error);
        });
    }
  }

  private saveLegislation(legislationEntry: ILegislation) {
    const jurisdiction: INomenclature = {code: this.selectedCountry.code, label: this.selectedCountry.title};
    const model: ISaveLegislation = {jurisdiction, legislationEntry};
    this.http.post('data/SaveLegislationEntry', model).subscribe(x => {
      this.getLegislationEntries(this.selectedCountry.code);
    });
  }

  dropDownClick(item: SmeDocItem) {
    this.transTypes[2].disabled = item.nationalActs && item.nationalActs.length > 0;
  }

  editComment(item: SmeDocItem) {
    this.comment = item.comment;
    this.smeDocItemForComment = item;
    this.showAddComment = true;
  }

  deleteComment(item: SmeDocItem) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the comment?',
      accept: () => {
        item.comment = null;
        this.showAddComment = false;
      }
    });
  }

  lockForEdit() {
    this.http.get(`data/LockDirectiveTransposition/${this.selectedDirective.celex}/${this.selectedCountry.id}`)
      .subscribe((x: DirectiveLockModel) => {
        if (x) {
          if (x.success) {
            this.canEdit = true;
            this.alertService.success('Locked successfully.');
          } else {
            this.alertService.error(`Cannot lock. Table is already locked by ${x.lockedBy}`);
          }
        }
      })
  }

  unlockTable() {
    this.http.get(`data/UnlockDirectiveTransposition/${this.selectedDirective.celex}/${this.selectedCountry.id}`)
      .subscribe(x => {
        this.alertService.success('Unlocked successfully.');
        this.canEdit = false; // if unauthorized exception is thrown
      }, err => this.alertService.error(err.error));
  }
}

