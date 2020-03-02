import { Component, OnInit, Input } from '@angular/core';
import { IEulawLink } from 'src/app/models/case-editor.model';

@Component({
    selector: 'add-edit-part',
    templateUrl: 'add-edit-part.component.html'
})


export class TranspositionPartComponent implements OnInit {
    @Input() euLink: IEulawLink;
    constructor() {
        this.euLink = new IEulawLink();
    }
    ngOnInit() { }
}
