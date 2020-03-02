import { Component, OnInit, Input } from '@angular/core';
import { INationalAct, transpositionTypes, INationalProvision, implementationTypes } from 'src/app/models/directive-models';
import { IEulawLink } from 'src/app/models/case-editor.model';

@Component({
    selector: 'nat-act-view',
    templateUrl: 'transp-nat-act-view.component.html'
})

export class NatActViewComponent implements OnInit {

    public natAct: INationalAct;
    public transpTypes = transpositionTypes;
    tmpProvision: INationalProvision;
    provisionVisible = false;


    @Input()
    set NationalAct(act: INationalAct) {
        if (act) {
            this.natAct = act;
        } else {
            this.natAct = {
                title: "",
                titleEn: "",
                provisions: []
            }
        }
    }

    constructor() { }

    ngOnInit() { }
    saveProvision() {
        this.natAct.provisions.push(this.tmpProvision);
        this.provisionVisible = false;
    }
    showProvision() {
        this.provisionVisible = true;
        this.tmpProvision = this.getEmptyProvision();
    }
    private getEmptyProvision() {
        const res: INationalProvision = {
            comment: "",
            id: "",
            implementationType: implementationTypes[0],
            isOfficialTranslation: false,
            link: new IEulawLink(),
            textEn: "",
            title: "",
            showComment: false
        }
        return res;
    }
}