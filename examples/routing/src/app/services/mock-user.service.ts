import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class MockUserService {
  getOneUser(id:number | string){ // URL parameters will always be string
    return {id:id, name:'Ethel', email:'skronk@gibbon.ie', level:'admin'}
  }
  getOneAPIUser(id:number | string){
    // make a call to https://randomuser.me/api/?seed=id (guarantees same use per id)
  }
}