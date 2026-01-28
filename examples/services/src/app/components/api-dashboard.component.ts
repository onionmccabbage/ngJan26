import { Component, inject, OnInit, signal } from "@angular/core";
import { ApiClient, apiClientFactory, apiClientProvider } from "../services/api-client.service";

// this is an incomplete example

// Usage in component
@Component({
  selector: 'app-dashboard',
  providers: [apiClientProvider, 
    // I added teh following line
    { provide: ApiClient, useFactory: apiClientFactory }],
  template:`
  <aside>
    <h3>Data from API Client service</h3>
    <p>{{user()}}</p>
  </aside>`
})
export class DashboardComponent implements OnInit {
    user = signal('fetching user data')
//   private apiClient = inject(ApiClient);
  apiClient = inject(ApiClient);
  ngOnInit(): void {
    //   this.user.set( ()=>{this.apiClient.fetchData('ie')} )
  }
}