import { Injectable, signal } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class FeatureFlags {
  isPremium = signal(false)
  togglePremium(){
    this.isPremium.set(!this.isPremium())
  }
  getPremiumFlag(){
    return this.isPremium()
  }
}