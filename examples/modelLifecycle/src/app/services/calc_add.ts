//  simple service see https://v19.angular.dev/essentials/dependency-injection

import {Injectable} from '@angular/core';
@Injectable({providedIn: 'root'})
export class CalcAdd {
  add(x: number, y: number) {
    return x + y;
  }
}