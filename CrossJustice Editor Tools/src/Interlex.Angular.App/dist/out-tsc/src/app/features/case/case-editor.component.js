var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { HttpService } from '../../core/services/http.service';
import { countryList, decisionTypes, IEucaseLink, IEulawLink, languageList, nationalities, yesNoRule } from '../../models/case-editor.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { ConfirmationService } from 'primeng/api';
var CaseEditorComponent = /** @class */ (function () {
    function CaseEditorComponent(http, router, route, alertService, confirmation) {
        var _this = this;
        this.http = http;
        this.router = router;
        this.route = route;
        this.alertService = alertService;
        this.confirmation = confirmation;
        this.selectedTreeNodes = [];
        this.euroVocChips = null;
        this.showTree = false;
        this.editEuLinkIndex = -1;
        this.editEucaseIndex = -1;
        this.submitted = false;
        this.countries = countryList;
        this.languages = languageList;
        this.decisionTypes = decisionTypes;
        this.initEmptyModel();
        this.route.paramMap.subscribe(function (params) {
            _this.caseId = params.get('id');
            if (_this.caseId) {
                _this.initModelFromApi();
            }
        });
        this.tmpEuLink = new IEulawLink();
        this.tmpEucaseLink = new IEucaseLink();
        this.tmpEuDoc = new IEucaseLink();
        this.yesNoRule = yesNoRule;
        this.showEuLink = false;
        this.showEuCaseLink = false;
        this.showKeyword = false;
        this.showEuDoc = false;
        this.isEuDoc = false;
    }
    CaseEditorComponent.prototype.initModelFromApi = function () {
        var _this = this;
        var id = this.caseId;
        this.http.get('./case/GetCaseContent/' + this.caseId).subscribe(function (data) {
            _this.mod = __assign({}, data, { dateOfDocument: new Date(data.dateOfDocument) });
            _this.mapEuroVocToTreeAndChips(data.eurovoc);
            _this.onModelChange(null);
            if (data.jurisdiction && data.jurisdiction.code) { // maybe pipe this with observable?
                _this.getSuggestionsFromApi(data.jurisdiction.code);
            }
        }, function (error) {
        });
    };
    CaseEditorComponent.prototype.initEmptyModel = function () {
        this.mod = {
            title: '',
            court: '',
            courtEng: '',
            dateOfDocument: new Date(),
            jurisdiction: null,
            keywords: null,
            nationalities: null,
            summary: '',
            language: null,
            decisionType: null,
            ecli: '',
            euCaselaw: [],
            euProvisions: [],
            eurovoc: [],
            interlexOntology: '',
            internationalCaseLaw: '',
            internationalLaw: '',
            nationalIdentifier: '',
            source: '',
            sourceUrl: '',
            text: '',
            residenceMsForum: null,
            choiceCourt: null,
            choiceLaw: null
        };
    };
    CaseEditorComponent.prototype.ngOnInit = function () {
    };
    CaseEditorComponent.prototype.getSuggestionsFromApi = function (code) {
        var _this = this;
        this.http.get("case/GetSuggestions/" + code).subscribe(function (x) {
            _this.courtSuggestions = x.courts || [];
            _this.courtEngSuggestions = x.courtsEng || [];
            _this.sourceSuggestions = x.sources || [];
        });
    };
    CaseEditorComponent.prototype.getEurovocData = function (data) {
        this.selectedTreeNodes = data;
        this.mod.eurovoc = [];
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var node = data_1[_i];
            this.mod.eurovoc.push({ label: node.label, code: node.data });
        }
        this.euroVocChips = this.selectedTreeNodes.map(function (x) { return x.label; });
        this.showTree = false;
    };
    CaseEditorComponent.prototype.removeChip = function (chip) {
        var value = chip.value;
        this.mod.eurovoc = this.mod.eurovoc.filter(function (x) { return x.label !== value; });
        this.selectedTreeNodes = this.selectedTreeNodes.filter(function (x) { return x.label !== value; });
    };
    CaseEditorComponent.prototype.addEulawLink = function () {
        this.editEuLinkIndex = -1;
        this.tmpEuLink = new IEulawLink();
        this.showEuLink = true;
    };
    CaseEditorComponent.prototype.showTreeFunc = function () {
        this.selectedTreeNodes = this.selectedTreeNodes.slice(); // needed for when selection is cleared but tree is not saved
        this.showTree = true;
    };
    CaseEditorComponent.prototype.validateEulawLink = function (link) {
        var celexTester = /^(((0|3|6|2|4|5|7|8|e)(19|20)\d{2}[a-zA-Zа-яА-Я]{1,3}\d{4}([a-zA-Zа-яА-Я]{0,3}\(\d{2}\)([rR]\(\d{2}\))?)?(\-\d{8})?)|((119|120)\d{2})((?!r\(\d)[a-zA-Z])+((\/txt)?(r\(\d+\))?))|((019|020)\d{2}[a-zA-Z]{1}\/TXT\-\d{8})/i;
        if (!celexTester.test(link.celex)) {
            this.alertService.error('"invalid celex number: ' + link.celex);
            return false;
        }
        return true;
    };
    CaseEditorComponent.prototype.addEditEuLink = function () {
        if (!this.validateEulawLink(this.tmpEuLink)) {
            return;
        }
        this.getNameFromEurLex(this.tmpEuLink);
        if (this.editEuLinkIndex > -1) {
            this.mod.euProvisions[this.editEuLinkIndex] = this.tmpEuLink;
        }
        else {
            this.mod.euProvisions.push(this.tmpEuLink);
        }
        this.showEuLink = false;
    };
    CaseEditorComponent.prototype.removeEuLink = function (itemToRemove) {
        var _this = this;
        this.removeCitation(function () {
            _this.mod.euProvisions = _this.mod.euProvisions.filter(function (item) { return item !== itemToRemove; });
        });
    };
    CaseEditorComponent.prototype.removeCitation = function (func) {
        this.confirmation.confirm({
            message: 'Do you want to delete this citation?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: function () {
                func();
            }
        });
    };
    CaseEditorComponent.prototype.editEuLink = function (itemToEdit, index) {
        this.editEuLinkIndex = index;
        this.tmpEuLink = JSON.parse(JSON.stringify(itemToEdit));
        this.showEuLink = true;
    };
    CaseEditorComponent.prototype.getNameFromEurLex = function (tmpLink) {
        this.http.get('/ReferenceEditor/actInfo?celex=' + tmpLink.celex).subscribe(function (data) {
            var name = data['title'];
            if (name) {
                tmpLink.name = (name.length > 100) ? name.substr(0, 100) + ' ...' : name;
            }
        });
    };
    CaseEditorComponent.prototype.addEditEuCase = function () {
        if (!this.validateEulawLink(this.tmpEucaseLink)) {
            return;
        }
        this.getNameFromEurLex(this.tmpEucaseLink);
        if (this.editEucaseIndex > -1) {
            this.mod.euCaselaw[this.editEucaseIndex] = this.tmpEucaseLink;
        }
        else {
            this.mod.euCaselaw.push(this.tmpEucaseLink);
        }
        this.showEuCaseLink = false;
    };
    CaseEditorComponent.prototype.removeEucaseLink = function (itemToRemove) {
        var _this = this;
        this.removeCitation(function () {
            _this.mod.euCaselaw = _this.mod.euCaselaw.filter(function (item) { return item !== itemToRemove; });
        });
    };
    CaseEditorComponent.prototype.editEucaseLink = function (itemToEdit, index) {
        this.editEucaseIndex = index;
        this.tmpEucaseLink = JSON.parse(JSON.stringify(itemToEdit));
        this.showEuCaseLink = true;
    };
    CaseEditorComponent.prototype.validateRequiredFields = function () {
        if (!this.mod.title) {
            // if (!this.mod.title || !this.mod.keywords || !this.mod.summary || !this.mod.jurisdiction
            //   || !this.mod.court || !this.mod.dateOfDocument || !this.mod.language || !this.mod.decisionType
            // )
            this.alertService.error('Please fill "Title" field!');
            return false;
        }
        // if (this.mod.keywords.length === 0) {
        //   this.alertService.error('Please fill all mandatory fields!');
        //   return false;
        // }
        return true;
    };
    CaseEditorComponent.prototype.submitForm = function (needToClose) {
        var _this = this;
        this.submitted = true;
        if (!this.validateRequiredFields()) {
            return;
        }
        var content = JSON.stringify(this.mod);
        var date = new Date();
        var title = this.mod.title;
        var body = { title: title, content: content, date: date };
        var id = this.route.snapshot.params.id;
        if (id) {
            this.http.post("case/EditCase/" + id, body).subscribe(function (x) {
                _this.alertService.success('Ok');
                if (needToClose) {
                    _this.router.navigate(['caselist']);
                }
            }, function (error) {
                _this.alertService.error('Error');
            });
        }
        else {
            this.http.post('case/SaveCase', body).subscribe(function (idInserted) {
                _this.alertService.success('Ok');
                if (needToClose) {
                    _this.router.navigate(['caselist']);
                }
                else {
                    _this.router.navigate(["caseeditor/" + idInserted]);
                }
            }, function (error) {
                _this.alertService.error('Error');
            });
        }
    };
    CaseEditorComponent.prototype.addEucaseLink = function () {
        this.editEucaseIndex = -1;
        this.tmpEucaseLink = new IEucaseLink();
        this.showEuCaseLink = true;
    };
    CaseEditorComponent.prototype.mapEuroVocToTreeAndChips = function (eurovoc) {
        this.euroVocChips = eurovoc.map(function (x) { return x.label; });
        this.selectedTreeNodes = eurovoc;
        // this.selectedTreeNodes = eurovoc.map(x => {label: x.label, });
    };
    CaseEditorComponent.prototype.addNationality = function () {
        this.showAddNationality = true;
    };
    CaseEditorComponent.prototype.addNationalityChip = function () {
        if (this.nationality) {
            if (!this.mod.nationalities) {
                this.mod.nationalities = [];
            }
            this.mod.nationalities.push(this.nationality);
            this.showAddNationality = false;
        }
        else {
            this.alertService.warn('Field nationality is required');
        }
    };
    CaseEditorComponent.prototype.filterNationalities = function (text) {
        this.filteredNationalities = [];
        for (var _i = 0, nationalities_1 = nationalities; _i < nationalities_1.length; _i++) {
            var nat = nationalities_1[_i];
            if (nat.toLowerCase().includes(text.query.toLowerCase())) {
                this.filteredNationalities.push(nat);
            }
        }
    };
    CaseEditorComponent.prototype.filterCourts = function (text) {
        this.courtSuggestionsFiltered = [];
        for (var _i = 0, _a = this.courtSuggestions; _i < _a.length; _i++) {
            var court = _a[_i];
            if (court.toLowerCase().includes(text.query.toLowerCase())) {
                this.courtSuggestionsFiltered.push(court);
            }
        }
    };
    CaseEditorComponent.prototype.filterCourtsEng = function (text) {
        this.courtEngSuggestionsFiltered = [];
        for (var _i = 0, _a = this.courtEngSuggestions; _i < _a.length; _i++) {
            var court = _a[_i];
            if (court.toLowerCase().includes(text.query.toLowerCase())) {
                this.courtEngSuggestionsFiltered.push(court);
            }
        }
    };
    CaseEditorComponent.prototype.filterSources = function (text) {
        this.sourceSuggestionsFiltered = [];
        for (var _i = 0, _a = this.sourceSuggestions; _i < _a.length; _i++) {
            var court = _a[_i];
            if (court.toLowerCase().includes(text.query.toLowerCase())) {
                this.sourceSuggestionsFiltered.push(court);
            }
        }
    };
    CaseEditorComponent.prototype.addKeyword = function () {
        if (this.keyword) {
            if (!this.mod.keywords) {
                this.mod.keywords = [];
            }
            this.mod.keywords.push(this.keyword);
            this.showKeyword = false;
        }
        else {
            this.alertService.warn('Field Keyword is required');
        }
    };
    CaseEditorComponent.prototype.onModelChange = function (event) {
        this.isEuDoc = false;
        this.isBgDoc = false;
        if (this.mod) {
            if (this.mod.jurisdiction) {
                if (this.mod.jurisdiction.code === 'EU') {
                    this.isEuDoc = true;
                }
                if (this.mod.jurisdiction.code === 'BG') {
                    this.isBgDoc = true;
                }
            }
        }
        if (event) {
            var code_1 = event.code;
            var language = this.languages.find(function (x) { return x.code === code_1; });
            this.mod.language = language;
            this.getSuggestionsFromApi(code_1);
        }
    };
    CaseEditorComponent.prototype.fillEudoc = function () {
        if (!this.validateEulawLink(this.tmpEuDoc)) {
            return;
        }
        this.fillModFromEurLex(this.tmpEuDoc);
        this.showEuDoc = false;
    };
    CaseEditorComponent.prototype.fillModFromEurLex = function (tmpLink) {
        var _this = this;
        this.http.get('/ReferenceEditor/actInfo?celex=' + tmpLink.celex).subscribe(function (data) {
            if (data) {
                _this.mod.title = data['title'];
                _this.mod.ecli = data['ecli'];
                _this.mod.dateOfDocument = new Date(data['date']);
                _this.mod.court = tmpLink.court.label;
                _this.mod.language = { label: 'English', code: 'EN' };
                _this.mod.decisionType = tmpLink.docType;
                _this.mod.source = 'EUR-Lex';
                _this.mod.sourceUrl = 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:' + tmpLink.celex;
            }
        });
    };
    CaseEditorComponent.prototype.addKeywordsClick = function () {
        this.showKeyword = true;
        this.keyword = '';
    };
    CaseEditorComponent.prototype.previewUrl = function () {
        if (this.mod.sourceUrl) {
            window.open(this.mod.sourceUrl);
        }
    };
    CaseEditorComponent = __decorate([
        Component({
            selector: 'app-case-editor',
            templateUrl: 'case-editor.component.html',
            styleUrls: ['./case-editor.component.css'],
            providers: [ConfirmationService]
        }),
        __metadata("design:paramtypes", [HttpService, Router, ActivatedRoute, AlertService,
            ConfirmationService])
    ], CaseEditorComponent);
    return CaseEditorComponent;
}());
export { CaseEditorComponent };
//# sourceMappingURL=case-editor.component.js.map