var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var IEubaseLink = /** @class */ (function () {
    function IEubaseLink() {
        this.celex = '';
        this.name = '';
        this.importance = { label: 'Low', code: '0' };
        this.docNumber = null;
        this.year = null;
        // abstract getPartStr(): string;
    }
    return IEubaseLink;
}());
export { IEubaseLink };
var IEulawLink = /** @class */ (function (_super) {
    __extends(IEulawLink, _super);
    function IEulawLink() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.docType = 0;
        _this.itemsBase = JSON.parse(JSON.stringify(emptyBaseEuParts));
        _this.itemsOther = JSON.parse(JSON.stringify(emptyOtherEuParts));
        return _this;
    }
    return IEulawLink;
}(IEubaseLink));
export { IEulawLink };
var IEucaseLink = /** @class */ (function (_super) {
    __extends(IEucaseLink, _super);
    function IEucaseLink() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.preliminaryRuling = { label: 'No', code: '0' };
        _this.court = { label: 'Court of Justice', code: 'C' };
        _this.docType = { label: 'Judgment', code: 'J' };
        return _this;
    }
    return IEucaseLink;
}(IEubaseLink));
export { IEucaseLink };
var IEuLinkItem = /** @class */ (function () {
    function IEuLinkItem() {
    }
    return IEuLinkItem;
}());
export { IEuLinkItem };
export var emptyBaseEuParts = [
    { label: 'Article', value: '', hrefPart: 'Art' },
    { label: 'Paragraph', value: '', hrefPart: 'Par' },
    { label: 'Alinea', value: '', hrefPart: 'Al' },
    { label: 'Point', value: '', hrefPart: 'Pt' },
    { label: 'Letter', value: '', hrefPart: 'Let' },
    { label: 'Indent', value: '', hrefPart: 'Ind' },
    { label: 'Sentence', value: '', hrefPart: 'Sent' },
    { label: 'Annex', value: '', hrefPart: 'Ann' },
    { label: 'Recital', value: '', hrefPart: 'Rec' },
];
export var emptyOtherEuParts = [
    { label: 'Part', value: '', hrefPart: 'Part' },
    { label: 'Title', value: '', hrefPart: 'Tit' },
    // { label: 'Subparagraph', value: '', hrefPart: 'Subpar' },
    { label: 'Chapter', value: '', hrefPart: 'Chap' },
    // { label: 'Proposal', value: '', hrefPart: 'Prop' },
    { label: 'Section', value: '', hrefPart: 'Sec' },
];
export var countryList = [
    { label: 'European union', code: 'EU' },
    { label: 'Austria', code: 'DE' },
    { label: 'Bulgaria', code: 'BG' },
    { label: 'Czech Republic', code: 'CS' },
    { label: 'France', code: 'FR' },
    { label: 'Germany', code: 'DE' },
    { label: 'Ireland', code: 'EN' },
    { label: 'Italy', code: 'IT' },
    { label: 'Poland', code: 'PL' },
    { label: 'Romania', code: 'RO' },
    { label: 'Spain', code: 'ES' },
    { label: 'Slovakia', code: 'SK' },
    { label: 'Sweden', code: 'SV' },
];
export var languageList = [
    { label: 'Bulgarian', code: 'BG' },
    { label: 'Czech', code: 'CS' },
    { label: 'English', code: 'EN' },
    { label: 'German', code: 'DE' },
    { label: 'French', code: 'FR' },
    { label: 'Italian', code: 'IT' },
    { label: 'Polish', code: 'PL' },
    { label: 'Romanian', code: 'RO' },
    { label: 'Spanish', code: 'ES' },
    { label: 'Slovak', code: 'SK' },
    { label: 'Swedish', code: 'SV' },
];
export var nationalities = ['Afghan', 'Albanian', 'Algerian', 'American', 'Argentinian', 'Australian', 'Austrian', 'Bangladeshi', 'Batswana',
    'Belgian', 'Bolivian', 'Brazilian', 'British', 'Bulgarian', 'Cambodian', 'Cameroonian', 'Canadian', 'Chilean', 'Chinese', 'Colombian',
    'Costa Rican', 'Croatian', 'Cuban', 'Czech', 'Danish', 'Dominican', 'Dutch', 'Ecuadorian', 'Egyptian', 'Emirati', 'English',
    'Estonian', 'Ethiopian', 'Fijian', 'Finnish', 'French', 'German', 'Ghanaian', 'Greek', 'Guatemalan', 'Haitian', 'Honduran',
    'Hungarian', 'Icelandic', 'Indian', 'Indonesian', 'Iranian', 'Iraqi', 'Irish', 'Israeli', 'Italian', 'Jamaican', 'Japanese',
    'Jordanian', 'Kenyan', 'Korean', 'Kuwaiti', 'Lao', 'Latvian', 'Lebanese', 'Libyan', 'Lithuanian', 'Malaysian', 'Malian', 'Maltese',
    'Mexican', 'Mongolian', 'Moroccan', 'Mozambican', 'Namibian', 'Nepalese', 'New', 'Zealand', 'Nicaraguan', 'Nigerian', 'Norwegian',
    'Pakistani', 'Panamanian', 'Paraguayan', 'Peruvian', 'Philippine', 'Polish', 'Portuguese', 'Romanian', 'Russian', 'Salvadorian',
    'Saudi', 'Scottish', 'Senegalese', 'Serbian', 'Singaporean', 'Slovak', 'South', 'African', 'Spanish', 'Sri', 'Lankan', 'Sudanese',
    'Swedish', 'Swiss', 'Syrian', 'Taiwanese', 'Tajikistani', 'Thai', 'Tongan', 'Tunisian', 'Turkish', 'Ukrainian', 'Uruguayan',
    'Venezuelan', 'Vietnamese', 'Welsh', 'Zambian', 'Zimbabwean'];
export var decisionTypes = [
    { label: 'Judgment', code: 'J' },
    { label: 'Order', code: 'O' },
    { label: 'Opinion of the Advocate-General', code: 'C' },
    { label: 'Other', code: 'other' }
];
export var importance = [
    { label: 'High', code: '1' },
    { label: 'Low', code: '0' },
];
export var yesNoRule = [
    { label: 'Yes', code: '1' },
    { label: 'No', code: '0' },
];
//# sourceMappingURL=case-editor.model.js.map