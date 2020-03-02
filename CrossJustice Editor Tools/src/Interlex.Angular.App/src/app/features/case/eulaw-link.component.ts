import {Component, OnInit, Input} from '@angular/core';
import {HttpService} from '../../core/services/http.service';
import {IEulawLink, importance, INomenclature, emptyBaseEuParts} from '../../models/case-editor.model';

@Component({
  selector: 'app-eulaw-link',
  templateUrl: 'eulaw-link.component.html',
  styleUrls: ['./eulaw-link.component.css']
})
export class EulawLinkComponent implements OnInit {
  importances: INomenclature[];
  emptyParts = emptyBaseEuParts;

  constructor(private http: HttpService) {
    this.importances = importance;
  }

  @Input() euLink: IEulawLink;

  ngOnInit() {

  }

  onChange(event) {
    this.euLink.celex = '';
    if (+this.euLink.docType === 4) {
      this.euLink.celex = '32016L1919';
      return;
    }
    if (+this.euLink.docType === 5) {
      this.euLink.celex = '32016L0800';
      return;
    }
    if (+this.euLink.docType === 6) {
      this.euLink.celex = '32016L0343';
      return;
    }
    if (+this.euLink.docType === 7) {
      this.euLink.celex = '32013L0048';
      return;
    }
    if (+this.euLink.docType === 8) {
      this.euLink.celex = '32012L0013';
      return;
    }
    if (+this.euLink.docType === 9) {
      this.euLink.celex = '32010L0064';
      return;
    }

    let letter = 'R';
    if (+this.euLink.docType === 1) {
      letter = 'R';
    }
    if (+this.euLink.docType === 2) {
      letter = 'L';
    }
    if (this.euLink.year && this.euLink.docNumber) {
      this.euLink.celex = '3' + this.euLink.year.toString() + letter.toString() +
        this.euLink.docNumber.toString().padStart(4, '0');
    }
  }

}
