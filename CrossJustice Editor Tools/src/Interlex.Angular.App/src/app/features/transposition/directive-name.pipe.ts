import { Pipe, PipeTransform } from '@angular/core';
import { SmeDocItemType } from 'src/app/models/directive-models';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({ name: 'dirname' })
export class DirectiveNamePipe implements PipeTransform {
    transform(value: string): string {
        return DirectiveName.ToFriendlyName(value);
    }
}

@Pipe({ name: 'diritemtrans' })
export class DirectiveItemTranspose implements PipeTransform{
    transform(value : SmeDocItemType): boolean{
        return (value != SmeDocItemType.Title) && (value != SmeDocItemType.DocTitle) && (value != SmeDocItemType.Chapter)
            && (value != SmeDocItemType.Part) && (value != SmeDocItemType.Preface) && (value != SmeDocItemType.Recital)
            && (value != SmeDocItemType.Section)
    }
}
export class DirectiveName{
    public static ToFriendlyName(value: string){
        let res = 'Directive ';
        const year = value.substr(1, 4);
        const num = +value.substr(6, 4);
        res += ' ' + year + '/' + num;
        return res;
    }
}
