import {LanguageModel} from "./language.model";
import {SelectItem} from "primeng/api";
import {ILegislation} from "./legislation.model";

export interface ICaseEditor {
  title: string;
  keywords: string[];
  summary: string;
  jurisdiction: INomenclature;
  rightsAccusedSuspect: string[];
  court: string;
  courtEng: string;
  dateOfDocument: Date;
  language: INomenclature;
  decisionType: INomenclature;
  nationalIdentifier: string;
  ecli: string;
  source: string;
  sourceUrl: string;
  crossjusticeOntology: string;
  eurovoc: INomenclature[];
  euProvisions: IEulawLink[];
  euCaselaw: IEucaseLink[];
  nationalLawRecords: ILegislation[];
  nationalCaseLawRecords: NationalCaseLawRecord[];
  caseHistory: CaseHistoryRecord[];
  ecthrCaseLawRecords: EcthrCaseLawRecord[];
  text: string;
}

export interface ICaseMetaContentResponse {
  content: string;
  editable: boolean;
}

export interface IExpertContentResponse extends ICaseMetaContentResponse {
  files: IFile[];
}

export interface IMetaEditor {
  title?: string;
  titleEn?: string;
  shortTitle?: string;
  abbreviation?: string;
  jurisdiction?: INomenclature;
  language?: INomenclature;
  actType?: INomenclature;
  eli?: string;
  publReference?: string;
  dateOfDocument?: Date;
  dateOfPublication?: Date;
  dateOfEffect?: Date;
  dateEndValidity?: Date;
  sourceName?: string;
  actUrl?: string;
  translatedActUrl?: string;
  actFile?: string; // this needs thinking over
  translatedActFile?: string;
  translationSource?: INomenclature;
  version?: INomenclature;
  consolidatedVersionDateOfEffect?: Date;
  editorVersionComment?: string;
}

export interface IExpertMaterial {
  title?: string;
  category?: INomenclature;
  journal?: string;
  issue?: string;
  pages?: string;
  author?: string[];
  corporateAuthor?: string[];
  publisher?: string[];
  publicationDate?: Date;
  publicationYear?: string;
  sources?: ISource[];
  abstract?: string;
  keywords?: string[];
  issn?: string[];
  isbn?: string[];
  doi?: string[];
  languages?: string[];
  formats?: string[];
  license?: ILicense;
  text?: string;
  // add others later

}

export interface ISource {
  name?: string;
  url?: string;
}

export interface ILicense {
  label?: string;
  value?: string;
  title?: string;
}

export interface IFile {
  id?: string;
  base64Content?: string;
  filename?: string;
  mimeType?: string;
  language?: LanguageModel;
}

export interface NationalLawRecord {
  title?: string;
  link?: string;
}

export interface NationalCaseLawRecord extends NationalLawRecord {
  identifier?: string;
  ecli?: string;
  citedParagraph?: string;
}

export interface CaseHistoryRecord {
  title: string;
  link: string;
  identifier: string;
  ecli: string;
}

export interface EcthrCaseLawRecord {
  link: string;
  identifier: string // ecli
}

export abstract class IEubaseLink {
  celex = '';
  name = '';
  importance: INomenclature = {label: 'Low', code: '0'};
  docNumber: number = null;
  year: number = null;
  // abstract getPartStr(): string;
}

export class IEulawLink extends IEubaseLink {
  docType = 0;
  itemsBase: IEuLinkItem[] = JSON.parse(JSON.stringify(emptyBaseEuParts));
  itemsOther: IEuLinkItem[] = JSON.parse(JSON.stringify(emptyOtherEuParts));
}

export class IEucaseLink extends IEubaseLink {
  part = '';
  preliminaryRuling: INomenclature = {label: 'No', code: '0'};
  court: INomenclature = {label: 'Court of Justice', code: 'C'};
  docType: INomenclature = {label: 'Judgment', code: 'J'};
}


export class IEuLinkItem {
  label: string;
  value: string;
  hrefPart: string;
  placeholder: string;
}

export const emptyBaseEuParts: IEuLinkItem[] = [
  {label: 'Article', value: '', hrefPart: 'Art', placeholder: '12'},
  {label: 'Paragraph', value: '', hrefPart: 'Par', placeholder: '3'},
  {label: 'Alinea', value: '', hrefPart: 'Al', placeholder: '1'},
  {label: 'Point', value: '', hrefPart: 'Pt', placeholder: '6'},
  {label: 'Letter', value: '', hrefPart: 'Let', placeholder: '5'},
  {label: 'Indent', value: '', hrefPart: 'Ind', placeholder: 'third'},
  {label: 'Sentence', value: '', hrefPart: 'Sent', placeholder: 'second'},
  {label: 'Annex', value: '', hrefPart: 'Ann', placeholder: 'Annex II, Article 1(2)(b)'},
  {label: 'Recital', value: '', hrefPart: 'Rec', placeholder: '45'},
];
export const emptyOtherEuParts: IEuLinkItem[] = [
  {label: 'Part', value: '', hrefPart: 'Part', placeholder: 'IV'},
  {label: 'Title', value: '', hrefPart: 'Tit', placeholder: 'III'},
  // { label: 'Subparagraph', value: '', hrefPart: 'Subpar' },
  {label: 'Chapter', value: '', hrefPart: 'Chap', placeholder: '6'},
  // { label: 'Proposal', value: '', hrefPart: 'Prop' },
  {label: 'Section', value: '', hrefPart: 'Sec', placeholder: '4'},
  // { label: 'Reference', value: '', hrefPart: 'Ref' },
];

export interface INomenclature {
  label: string;
  code: string;
}

export interface ISaveLegislation {
  jurisdiction: INomenclature;
  legislationEntry: ILegislation;
}

export const countryList: INomenclature[] = [
  {label: 'European union', code: 'EU'},
  {label: 'Italy', code: 'IT'},
  {label: 'France', code: 'FR'},
  {label: 'Spain', code: 'ES'},
  {label: 'Romania', code: 'RO'},
  {label: 'Portugal', code: 'PT'},
  {label: 'Sweden', code: 'SV'},
  {label: 'Germany', code: 'DE'},
  {label: 'Bulgaria', code: 'BG'},
  {label: 'Poland', code: 'PL'},
  {label: 'Croatia', code: 'HR'},
  {label: 'Netherlands', code: 'NL'}
];

export const languageList: INomenclature[] = [
  {label: 'Italian', code: 'IT'},
  {label: 'French', code: 'FR'},
  {label: 'Spanish', code: 'ES'},
  {label: 'English', code: 'EN'},
  {label: 'Romanian', code: 'RO'},
  {label: 'Portuguese', code: 'PT'},
  {label: 'Swedish', code: 'SV'},
  {label: 'German', code: 'DE'},
  {label: 'Bulgarian', code: 'BG'},
  {label: 'Polish', code: 'PL'},
  {label: 'Croatian', code: 'HR'},
  {label: 'Dutch', code: 'NL'},
];

export const euLanguages: INomenclature[] = [
  {label: 'Bulgarian', code: 'bg'},
  {label: 'Spanish', code: 'es'},
  {label: 'Czech', code: 'cs'},
  {label: 'Danish', code: 'da'},
  {label: 'German', code: 'de'},
  {label: 'Estonian', code: 'et'},
  {label: 'Greek', code: 'el'},
  {label: 'English', code: 'en'},
  {label: 'French', code: 'fr'},
  {label: 'Irish', code: 'ga'},
  {label: 'Croatian', code: '	hr'},
  {label: 'Italian', code: 'it'},
  {label: 'Latvian', code: 'lv'},
  {label: 'Lithuanian', code: 'lt'},
  {label: 'Hungarian', code: 'hu'},
  {label: 'Maltese', code: 'mt'},
  {label: 'Dutch', code: 'nl'},
  {label: 'Polish', code: 'pl'},
  {label: 'Portuguese', code: 'pt'},
  {label: 'Romanian', code: 'ro'},
  {label: 'Slovak', code: 'sk'},
  {label: 'Slovenian', code: 'sl'},
  {label: 'Finnish', code: 'fi'},
  {label: 'Swedish', code: 'sv'}
];

export const nationalities = ['Afghan', 'Albanian', 'Algerian', 'American', 'Argentinian', 'Australian', 'Austrian', 'Bangladeshi', 'Batswana',
  'Belgian', 'Bolivian', 'Brazilian', 'British', 'Bulgarian', 'Cambodian', 'Cameroonian', 'Canadian', 'Chilean', 'Chinese', 'Colombian',
  'Costa Rican', 'Croatian', 'Cuban', 'Czech', 'Danish', 'Dominican', 'Dutch', 'Ecuadorian', 'Egyptian', 'Emirati', 'English',
  'Estonian', 'Ethiopian', 'Fijian', 'Finnish', 'French', 'German', 'Ghanaian', 'Greek', 'Guatemalan', 'Haitian', 'Honduran',
  'Hungarian', 'Icelandic', 'Indian', 'Indonesian', 'Iranian', 'Iraqi', 'Irish', 'Israeli', 'Italian', 'Jamaican', 'Japanese',
  'Jordanian', 'Kenyan', 'Korean', 'Kuwaiti', 'Lao', 'Latvian', 'Lebanese', 'Libyan', 'Lithuanian', 'Luxembourgian', 'Malaysian', 'Malian', 'Maltese',
  'Mexican', 'Mongolian', 'Moroccan', 'Mozambican', 'Namibian', 'Nepalese', 'New', 'Zealand', 'Nicaraguan', 'Nigerian', 'Norwegian',
  'Pakistani', 'Panamanian', 'Paraguayan', 'Peruvian', 'Philippine', 'Polish', 'Portuguese', 'Romanian', 'Russian', 'Salvadorian',
  'Saudi', 'Scottish', 'Senegalese', 'Serbian', 'Singaporean', 'Slovak', 'South', 'African', 'Spanish', 'Sri', 'Lankan', 'Sudanese',
  'Swedish', 'Swiss', 'Syrian', 'Taiwanese', 'Tajikistani', 'Thai', 'Tongan', 'Tunisian', 'Turkish', 'Ukrainian', 'Uruguayan',
  'Venezuelan', 'Vietnamese', 'Welsh', 'Zambian', 'Zimbabwean'];

export const countries = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla",
  "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas",
  "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia",
  "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam",
  "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands",
  "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia",
  "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire",
  "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia",
  "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana",
  "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar",
  "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti",
  "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India",
  "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait",
  "Kyrgyzstan", "Lao, People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya",
  "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of", "Madagascar",
  "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius",
  "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat",
  "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles",
  "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands",
  "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn",
  "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda",
  "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino",
  "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore",
  "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
  "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon",
  "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic",
  "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga",
  "Trinidad and Tobago", "Tunisia", "Türkiye", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine",
  "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay",
  "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)",
  "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"];

export const decisionTypes: INomenclature[] = [
  {label: 'Judgment', code: 'J'},
  {label: 'Order', code: 'O'},
  {label: 'Opinion of the Advocate-General', code: 'C'},
  {label: 'Other', code: 'other'}
];

export const rightsAccusedSuspect: INomenclature[] = [
  {label: 'Right to interpretation', code: '1'},
  {label: 'Right to translation', code: '2'},
  {label: 'Right to information', code: '3'},
  {label: 'Right of access to the file', code: '4'},
  {label: 'Remedies', code: '5'},
  {label: 'Right of access to a lawyer', code: '6'},
  {label: 'Right to have a third party informed', code: '7'},
  {label: 'Right to communicate with consular authorities', code: '8'},
  {label: 'Legal aid', code: '9'},
  {label: 'Presumption of innocence: rule of treatment', code: '10'},
  {label: 'Presumption of innocence: burden of proof', code: '11'},
  {label: 'Privilege against self-incrimination', code: '12'},
  {label: 'Right to be present at trial', code: '13'},
  {label: 'Right to a re-trial', code: '14'},
  {label: 'Juvenile defendants', code: '15'},
];


export interface ICaseListResponseModel {
  caseId: number;
  userName: string;
  title: string;
  lastChange: Date;
  organization: string;
  docDate: Date;
  editable: boolean;
}

export interface ICaseListRequestModel {
  filter: string;
  pageNumber: number;
  count: number;
  organization: string;
  jurisdictionCode: string;
}

export const importance: INomenclature[] = [
  {label: 'High', code: '1'},
  {label: 'Low', code: '0'},
];

export const yesNoRule: INomenclature[] = [
  {label: 'Yes', code: '1'},
  {label: 'No', code: '0'},
];

export const actTypes: INomenclature[] = [
  {
    label: 'Constitution',
    code: 'c'
  },
  {
    label: 'Law / Statutes',
    code: 'ls'
  },
  {
    label: 'Legislative decree',
    code: 'led'
  },
  {
    label: 'Law decree',
    code: 'lad'
  },
  {
    label: 'Ministerial decree',
    code: 'md'
  },
  {
    label: 'Regulation',
    code: 'r'
  },
  {
    label: 'Organic Law',
    code: 'ol'
  },
  {
    label: 'Order',
    code: 'or'
  },
  {
    label: 'Presidential Decree',
    code: 'pd'
  },
  {
    label: 'Policy Regulation', code: 'pr'
  },
  {label: 'Instruction', code: 'in'},
  {label: 'Ordinance', code: 'ord'}

];

// export function padStart(txt: string, targetLength: number, padString: string) {
//     padString = String((typeof padString !== 'undefined' ? padString : ' '));
//     if (txt.length > targetLength) {
//         return txt;
//     } else {
//         targetLength = targetLength - txt.length;
//         if (targetLength > padString.length) {
//             padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
//         }
//         return padString.slice(0, targetLength) + txt;
//     }
// }
