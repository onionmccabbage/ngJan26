// src/app/services/basic-data-store.ts
// see https://angular.dev/guide/di/creating-and-using-services
import {Injectable} from '@angular/core';
@Injectable({providedIn: 'root'})
export class BasicDataStore {
  private data: string[] = [];
  addData(item: string): void {
    this.data.push(item);
  }
  getData(): string[] { 
    console.log([...this.data]) // an array
    console.log(this.data) // an array
    console.log(...this.data) // a comma separated string
    // spread the array into a string of values in a new array ...
    return [...this.data]; // NB the [] is a new array
    // return this.data // fails since the original array cannot be rendered as an array
  }
}