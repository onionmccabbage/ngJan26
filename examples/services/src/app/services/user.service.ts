import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getApiBaseUrl(){
    return `https://randomuser.me/api`
  }
  getRateLimit(){
    return 1000 // rate limit in ms
  }
}