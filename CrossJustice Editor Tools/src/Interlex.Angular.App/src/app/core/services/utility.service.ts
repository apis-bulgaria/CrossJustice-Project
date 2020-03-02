import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() {
  }

  fixUrl(url: string): string {
    if (url) {
      const fixed = url.startsWith('http') ? url : 'http://' + url;
      return fixed;
    }
  }

  deepCopy<T>(obj: T): T { // problems in some cases - dates, etc. use with caution
    return JSON.parse(JSON.stringify(obj)) as T;
  }
}
