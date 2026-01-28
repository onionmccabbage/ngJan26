import { Component, inject } from "@angular/core";
import { APP_CONFIG } from "../services/config.token";

// No need to add to providers array - available everywhere!
@Component({
    selector: 'app-header',
    template: `
  <header>
  <h1>Version: {{ config.version }}</h1>
  <ul>
    <li><a href={{config.apiUrl}}>Fortune</a></li>
    <li>Dark Mode: {{config.features['darkMode']}}</li>
    <li>Analytics: {{config.features['analytics']}}</li>
</ul>
</header>`,
})
export class HeaderComponent {
    config = inject(APP_CONFIG); // Automatically available
}