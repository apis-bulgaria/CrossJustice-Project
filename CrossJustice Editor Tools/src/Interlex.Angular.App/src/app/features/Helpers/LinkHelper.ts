import {IEulawLink, IEuLinkItem} from "src/app/models/case-editor.model";

export class LinkHelper {
    public static GetEuLinkString(value: {itemsBase?: IEuLinkItem[], itemsOther?: IEuLinkItem[]}): string {
        let res = '';
        if (value.itemsOther && value.itemsOther.length > 0) {
            value.itemsOther.forEach(item => {
                if (item.value && item.value !== '') {
                    res += item.label + ' ' + item.value + ', ';
                }
            });

            if (res.length > 3) {
                res = res.substr(0, res.length - 2) + ' ';
            }
        }
        let mainPartsStr = '';
        if (value.itemsBase && value.itemsBase.length > 0) {
            value.itemsBase.forEach(item => {
                if (item.value && item.value !== '') {
                    if ((item.label === 'Article') || (item.label === 'Paragraph') || (item.label === 'Alinea')
                        || (item.label === 'Point') || (item.label === 'Letter')) {

                        if (mainPartsStr === '') {
                            mainPartsStr += item.label + ' ' + item.value;
                        } else {
                            mainPartsStr += '(' + item.value + ')';
                        }
                    }
                    if ((item.label === 'Indent') || (item.label === 'Sentence')) {
                        if (mainPartsStr !== '') {
                            mainPartsStr += ', ' + item.value + ' ' + item.label.toLocaleLowerCase();
                        } else {
                            mainPartsStr += item.value + ' ' + item.label.toLocaleLowerCase();
                        }
                    }

                    if (item.label === 'Annex') {
                        if (mainPartsStr !== '') {
                            mainPartsStr = item.label + ' ' + item.value + ', ' + mainPartsStr;
                        } else {
                            mainPartsStr = item.label + ' ' + item.value + mainPartsStr;
                        }
                    }
                    if ((item.label === 'Recital')) {
                        if (mainPartsStr === '') {
                            mainPartsStr += item.label + ' ' + item.value;
                        } else {
                            mainPartsStr += ', ' + item.label + ' ' + item.value;
                        }
                    }
                }
            });
        }
        if (mainPartsStr != '') {
            if (res != '') {
                res += ' ' + mainPartsStr;
            } else {
                res = mainPartsStr;
            }
        }

        return res;
    }
}
