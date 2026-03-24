import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-resource-signal',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div style="padding: 2rem; font-family: sans-serif;">
      <a routerLink="/" style="display: inline-block; margin-bottom: 1.5rem; color: #666; text-decoration: none;">&larr; Back to Index</a>
      
      <h2>5. Resource Signals (REST API) Example</h2>
      <p>The <code>resource()</code> API integrates async data (like REST API calls) directly into the Angular signal reactivity graph via a service.</p>
      
      <div style="display: flex; gap: 10px; margin-bottom: 2rem;">
        <!-- Calling the reload method exposed by the service -->
        <button (click)="userService.reloadUsers()" style="padding: 0.5rem 1rem; cursor: pointer;">Reload Users</button>
      </div>
      
      <div style="margin: 2rem 0; padding: 1.5rem; background: #eef2f5; border-radius: 8px; min-height: 150px;">
        <!-- The resource provides reactive properties like isLoading(), error(), value() -->
        @if (userService.usersResource.isLoading()) {
          <p>Loading users from REST API...</p>
        } @else if (userService.usersResource.error()) {
          <p style="color: red;">Error: {{ userService.usersResource.error() }}</p>
        } @else if (userService.usersResource.value(); as users) {
          <p style="font-size: 1.25rem;">Fetched <strong>{{ users.length }}</strong> users.</p>
          <ul style="margin-top: 1rem;">
            @for (user of users; track user.id) {
              <li style="margin-bottom: 0.5rem; padding: 0.5rem; background: #fff; border-radius: 4px; border: 1px solid #ddd;">
                <strong>{{ user.name }}</strong> ({{ user.email }})
              </li>
            }
          </ul>
        }
      </div>
    </div>
  `
})
export class ResourceSignalComponent {
  // Inject the service that contains the resource
  userService = inject(UserService);
}
