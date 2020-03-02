import {IEuLinkItem} from "./case-editor.model";

export interface ILegislation {
  title?: string;
  titleEn?: string;
  url?: string;
  eli?: string;
  include?: boolean; // include in legislation tab
  itemsBase?: IEuLinkItem[];
  itemsOther?: IEuLinkItem[];
}
