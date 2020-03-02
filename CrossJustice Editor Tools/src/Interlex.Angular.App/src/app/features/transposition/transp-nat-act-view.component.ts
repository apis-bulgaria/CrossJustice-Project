import {Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';
import {INationalAct, INationalProvision} from 'src/app/models/directive-models';
import {IEulawLink} from 'src/app/models/case-editor.model';
import {AlertService} from 'src/app/core/services/alert.service';
import {LinkHelper} from '../Helpers/LinkHelper';
import {SelectItem, ConfirmationService} from 'primeng/api';
import {UtilityService} from "../../core/services/utility.service";

@Component({
  selector: 'nat-act-view',
  templateUrl: 'transp-nat-act-view.component.html',
  styleUrls: ['./transp-nat-act-view.component.css']
})

export class NatActViewComponent implements OnInit {

  public natAct: INationalAct;
  tmpProvision: INationalProvision;
  currentProvision: INationalProvision;
  provisionVisible = false;
  tmpNationalAct: INationalAct;
  transTypes: SelectItem[] = [
    {label: 'Official', value: {code: '1', label: 'Official'}},
    {label: 'Unofficial', value: {code: '2', label: 'Unofficial'}},
    {label: 'CrossJustice', value: {code: '3', label: 'CrossJustice Editor'}}
  ];
  @Input() canEdit: boolean;

  @Input()
  set NationalAct(act: INationalAct) {
    if (act) {
      this.natAct = act;
    } else {
      this.natAct = {
        title: '',
        titleEn: '',
        isOfficialTranslation: this.transTypes[0].value,
        provisions: []
      }
    }
  }

  @Output() editNatAct = new EventEmitter();
  @Output() removeNatAct = new EventEmitter();
  deleteNatAct: any;
  length = 170;

  // showmore = false;

  constructor(private alertService: AlertService, private ref: ChangeDetectorRef, private util: UtilityService,
              private confirmationService: ConfirmationService) {
    this.tmpNationalAct = {
      provisions: [],
      isOfficialTranslation: this.transTypes[0].value,
      title: '',
      titleEn: ''
    };
  }

  ngOnInit() {
    console.log(this.natAct.provisions);
  }

  saveProvision() {
    if (this.validateProvisionFields(this.tmpProvision)) {
      if (this.currentProvision === null) {
        this.natAct.provisions.push(this.tmpProvision);
      } else {
        const ind = this.natAct.provisions.indexOf(this.currentProvision);
        this.natAct.provisions[ind] = this.util.deepCopy(this.tmpProvision);
      }
      this.provisionVisible = false;
    }
  }

  showProvision() {
    this.provisionVisible = true;
    this.currentProvision = null;
    this.tmpProvision = this.getEmptyProvision();
  }

  private getEmptyProvision() {
    const res: INationalProvision = {
      comment: '',
      // id: '',
      implementationType: {code: '1', label: 'Fully implemented'},
      link: new IEulawLink(),
      textEn: '',
      // title: ''
      showComment: false,
      showMore: false
    };
    return res;
  }

  public editAct() {
    this.editNatAct.emit();
  }

  deleteAct(natAct) {
    this.removeNatAct.emit({deleteNatAct: this.natAct});
  }

  public removeProvision(prov: INationalProvision) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this provision?',
      accept: () => {
        this.natAct.provisions = this.natAct.provisions.filter(x => x !== prov);
      }
    });
  }

  public editProvision(prov: INationalProvision) {
    this.tmpProvision = this.util.deepCopy(prov);
    this.currentProvision = prov;
    this.provisionVisible = true;
  }

  validateProvisionFields(prov: INationalProvision) {
    if (!prov.textEn) {
      this.alertService.error('Field "Text in English" is required!');
      return false;
    }
    if (!LinkHelper.GetEuLinkString(prov.link)) {
      this.alertService.error('Please select Provision!');
      return false;
    }
    return true;
  }

  displayComment(prov) {
    if (prov.showComment !== true) {
      prov.showComment = true;
    } else {
      prov.showComment = false;
    }
    this.ref.detectChanges();
  }

  showMore(prov) {
    if (prov.showMore !== true) {
      prov.showMore = true;
    } else {
      prov.showMore = false;
    }
    this.ref.detectChanges();
  }
}





