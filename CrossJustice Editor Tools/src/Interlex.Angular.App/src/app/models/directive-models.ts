import { INomenclature, IEulawLink } from "./case-editor.model";
import { ILegislation } from "./legislation.model";

export enum SmeDocItemType { Title, Recital, Section, Chapter, Part, Article, Paragraph, SubParagraph, Point, Sentence, Letter, Number, Text, DocTitle, Preface };

export class SmeDocItem {
    id: string;
    fullId: string;
    isBookmarked: boolean;
    type: SmeDocItemType;
    text: string;
    heading: string;
    subParagraph: string;
    subHeading: string;
    comment: string;
    hasPal: string;
    hasRecitals: boolean;
    treeLevel: number;
    recitals: string[];
    articles: string[];
    oldArticles: string[];
    childs: SmeDocItem[];
    hasTransposition: boolean;
    transp: INomenclature;
    nationalActs: INationalAct[] = [];
    colorId: number;
    canTranspose: boolean;
}


export interface INationalAct extends ILegislation {
    isOfficialTranslation: INomenclature; //Official, Unofficial, euroCases
    provisions: INationalProvision[];
}

export interface INationalProvision {
    link: IEulawLink;
    // id: string; //art_1
    // title: string; //text box
    textEn: string; //text area

    implementationType: INomenclature; //i.	Fully implemented     ii.	Partially implemented     iii.	Not implemented // dropdown
    comment: string; //text area
    showComment?: boolean;
    showMore?: boolean;
}

export interface SmeDocMeta {
    title: string;
    shortTitle: string;
    subTitle: string;
    publicationDate?: Date;
    actDate?: Date;
    lastChangeDate?: Date;
    language: string;
    country: string;
    idenitifier: string;
    docLangId: string;
    docNumber: string;
    shortLang: string;
    langId: number;
    docType: number;
    isBlob: number;
}

export interface SmeDoc {
    meta: SmeDocMeta;
    items: SmeDocItem[];
}

export interface DirectiveTranspResponseModel {
  content: string; // this is unparsed SmeDoc
  celex: string;
  countryId: number;
  isLockedByCurrentUser: boolean;
}

export interface DirectiveLockModel {
  success: boolean;
  lockedBy: string;
}
export interface IDirectiveModel {
    id: number;
    celex: string;
    caption: string;
    content: string;
}

export interface ICountryModel {
    id: number;
    title: string;
    code: string;
}

export interface ISaveTranspositionModel {
    celex: string;
    countryId: number;
    content: string;
}

export const implementationTypes: INomenclature[] = [
    { code: "1", label: "Fully implemented" },
    { code: "2", label: "Partially implemented" },
    { code: "3", label: "Not implemented" }];

