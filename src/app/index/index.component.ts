import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div style="padding: 2rem; font-family: sans-serif;">
      <h1>Learn Angular Signals</h1>
      <p>Navigate through the examples below to learn Angular Signals step by step.</p>
      <ul style="list-style: none; padding: 0; margin-top: 2rem;">
        <li style="margin-bottom: 1rem; padding: 1rem; border: 1px solid #ddd; border-radius: 8px;">
          <a routerLink="/signals/basic" style="text-decoration: none; color: #0056b3; font-size: 1.2rem; display: block;">
            <strong>Step 1.</strong> Basic Writable Signal ( signal() )
          </a>
        </li>
        <li style="margin-bottom: 1rem; padding: 1rem; border: 1px solid #ddd; border-radius: 8px;">
          <a routerLink="/signals/computed" style="text-decoration: none; color: #0056b3; font-size: 1.2rem; display: block;">
            <strong>Step 2.</strong> Computed Signals ( computed() )
          </a>
        </li>
        <li style="margin-bottom: 1rem; padding: 1rem; border: 1px solid #ddd; border-radius: 8px;">
          <a routerLink="/signals/effect" style="text-decoration: none; color: #0056b3; font-size: 1.2rem; display: block;">
            <strong>Step 3.</strong> Effect Signals ( effect() )
          </a>
        </li>
        <li style="margin-bottom: 1rem; padding: 1rem; border: 1px solid #ddd; border-radius: 8px;">
          <a routerLink="/signals/untracked" style="text-decoration: none; color: #0056b3; font-size: 1.2rem; display: block;">
            <strong>Step 4.</strong> Untracked Signals ( untracked() )
          </a>
        </li>
        <li style="margin-bottom: 1rem; padding: 1rem; border: 1px solid #ddd; border-radius: 8px;">
          <a routerLink="/signals/resource" style="text-decoration: none; color: #008a00; font-size: 1.2rem; display: block;">
            <strong>Step 5.</strong> Resource API ( REST HTTP )
          </a>
        </li>
      </ul>
    </div>
  `
})
export class IndexComponent {}
