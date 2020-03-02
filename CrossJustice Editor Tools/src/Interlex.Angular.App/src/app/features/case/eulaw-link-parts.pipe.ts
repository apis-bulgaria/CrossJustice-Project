import {Pipe, PipeTransform} from '@angular/core';
import {IEuLinkItem, IEulawLink} from '../../models/case-editor.model';
import {LinkHelper} from '../Helpers/LinkHelper';
import {ILegislation} from "../../models/legislation.model";

/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'eulinkPart'})
export class EulinkPartPipe implements PipeTransform {
  transform(value: IEulawLink): string {
    let res = ' ' + LinkHelper.GetEuLinkString(value);

    if (res !== ' ') {
      res = ' - ' + res;
    }
    return res;
  }
}

@Pipe({name: 'natLawPart'})
export class NatLawPart implements PipeTransform {
  transform(value: ILegislation): string {
    let res = value.title;
    const parts = ' ' + LinkHelper.GetEuLinkString(value);
    if (parts !== ' ') {
      res += ' - ' + parts;
    }
    return res;
  }
}

@Pipe({name: 'natlinkPart'})
export class NatLinkPartPipe implements PipeTransform {
  transform(value: IEulawLink): string {
    const res = LinkHelper.GetEuLinkString(value);
    return res == '' ? null : res;
  }
}

@Pipe({name: 'eulawhref'})
export class EulawHrefPipe implements PipeTransform {
  transform(value: IEulawLink): string {
    let res = '';
    if (value.celex) {
      res += 'https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX:' + value.celex;
    }
    return res;
  }
}
