import { Component, OnInit, Input } from '@angular/core';
import { INationalProvision } from 'src/app/models/directive-models';
import { IEulawLink } from 'src/app/models/case-editor.model';
import { SelectItem } from 'primeng/api';
import { AlertService } from 'src/app/core/services/alert.service';
import { LinkHelper } from '../Helpers/LinkHelper';
import {UtilityService} from "../../core/services/utility.service";

@Component({
    selector: 'add-edit-provision',
    templateUrl: 'add-edit-provision.component.html'
})

export class TranspositionProvisionComponent implements OnInit {

    public provision: INationalProvision;
    public partVisible = false;
    public tmpEuLink: IEulawLink;
    implTypes: SelectItem[] = [
        { label: 'Fully implemented', value: { code: '1', label: 'Fully implemented' } },
        { label: 'Partially implemented', value: { code: '2', label: 'Partially implemented' } },
        // { label: 'Not implemented', value: { code: '3', label: 'Not implemented' } }
    ];

    @Input() set Provision(prov: INationalProvision) {
        if (prov) {
            if (!prov.link) {
                prov.link = new IEulawLink();
            }
           // console.log(prov)
            this.provision = prov;

        } else {
            this.provision = this.getEmpryProvision();
        }
    }
    getEmpryProvision() {
        return {
            // title: '',
            comment: '',
            // id: '',
            textEn: '',
            implementationType: null,
            link: new IEulawLink(),
            showComment: false
        };
    }
    constructor(private alertService: AlertService, private util: UtilityService) {
        this.tmpEuLink = new IEulawLink();
        this.provision = this.getEmpryProvision();
    }

    ngOnInit() { }

    showPartsDialog() {
        this.tmpEuLink = this.util.deepCopy(this.provision.link);
        this.partVisible = true;
    }
    savePart() {
        this.provision.link = this.tmpEuLink;
        this.partVisible = false;
    }

}
