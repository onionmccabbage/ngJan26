// Service that needs runtime configuration
// see  https://angular.dev/guide/di/defining-dependency-providers
// I added 'export' here
export class ApiClient {
    constructor(
        private http: HttpClient,
        private baseUrl: string,
        private rateLimitMs: number,
    ) {}
    async fetchData(endpoint: string) {
        // Apply rate limiting based on user tier
        await this.applyRateLimit();
        return this.http.get(`${this.baseUrl}/?nat=${endpoint}`);
    }
    private async applyRateLimit() {
        // Simplified example - real implementation would track request timing
        return new Promise((resolve) => setTimeout(resolve, this.rateLimitMs));
    }
}

// Factory function that configures based on user service
import {inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { UserService } from './user.service';
export const apiClientFactory = () => {
    const http = inject(HttpClient);
    const userService = inject(UserService);
    // Assuming userService provides these values
    const baseUrl = userService.getApiBaseUrl();
    const rateLimitMs = userService.getRateLimit();
    return new ApiClient(http, baseUrl, rateLimitMs);
};
// Provider configuration
// I added 'export' here
export const apiClientProvider = {
  provide: ApiClient,
  useFactory: apiClientFactory,
};
