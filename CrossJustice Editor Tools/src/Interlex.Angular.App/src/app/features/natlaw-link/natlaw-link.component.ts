import {Component, Input, OnInit} from '@angular/core';
import {ILegislation} from "../../models/legislation.model";
import {IEulawLink} from "../../models/case-editor.model";
import {UtilityService} from "../../core/services/utility.service";
import {AlertService} from "../../core/services/alert.service";

@Component({
  selector: 'app-natlaw-link',
  templateUrl: './natlaw-link.component.html',
  styleUrls: ['./natlaw-link.component.css']
})
export class NatlawLinkComponent implements OnInit {

  legislationSelected: ILegislation; // this and the next one can be object or strings in case of manual entry in dropdown
  legislationSelectedEn: ILegislation;
  includeLegislation = false;
  _currentItem: ILegislation = {};

  @Input() showAdvanced;
  @Input() legislationDropdown: ILegislation[];

  @Input() set currentItem(value: ILegislation) {
    if (value) {
      this._currentItem = this.util.deepCopy(value);
      const items = new IEulawLink();
      if (this._currentItem.itemsBase == null || this._currentItem.itemsBase.length === 0) {
        this._currentItem.itemsBase = items.itemsBase;
      }
      if (this._currentItem.itemsOther == null || this._currentItem.itemsOther.length === 0) {
        this._currentItem.itemsOther = items.itemsOther;
      }

      // this should be enough to reset selected objects - if not, reset manually
      this.legislationSelected = this.legislationDropdown.find(x => x.title === value.title) || value.title as any;
      this.legislationSelectedEn = this.legislationDropdown.find(x => x.title === value.title) || value.titleEn as any;
    }

  }

  constructor(private util: UtilityService, private alertService: AlertService) {
  }

  ngOnInit() {
  }

  legislationChange(ev: any, isEnglish: boolean) {
    if (typeof ev.value === 'string' || ev.value == null) {
      return;
    }
    const value = ev.value as ILegislation;
    this._currentItem.url = value.url;
    this._currentItem.eli = value.eli;
    if (isEnglish) {
      this.legislationSelected = this.legislationSelectedEn;
    } else {
      this.legislationSelectedEn = this.legislationSelected;
    }
  }

  checkSelectedTypes(legislationSelected: ILegislation, legislationSelectedEn: ILegislation) {
    const isObjectA = (legislationSelected != null && legislationSelected.title != null);
    const isObjectB = (legislationSelectedEn != null && legislationSelectedEn.titleEn != null);
    const checkBoxVisible = !isObjectA && !isObjectB;
    if (!checkBoxVisible) {
      this.includeLegislation = false;
    }
    return checkBoxVisible;
  }

  getNationalLawItem(): ILegislation {
    let title: string;
    if (this.legislationSelected) {
      title = typeof this.legislationSelected === 'string' ? this.legislationSelected : this.legislationSelected.title;
    }
    let titleEn: string;
    if (this.legislationSelectedEn) {
      titleEn = typeof this.legislationSelectedEn === 'string' ? this.legislationSelectedEn : this.legislationSelectedEn.titleEn;
    }
    if (!title || !titleEn) {
      this.alertService.error('Field title is required.');
      return;
    }
    const clone = this.util.deepCopy(this._currentItem);
    clone.title = title;
    clone.titleEn = titleEn;
    return clone;
  }
}
