import { Component, effect, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-effect-signal',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div style="padding: 2rem; font-family: sans-serif;">
      <a routerLink="/" style="display: inline-block; margin-bottom: 1.5rem; color: #666; text-decoration: none;">&larr; Back to Index</a>
      
      <h2>3. Effect Signals Example</h2>
      <p>An <code>effect()</code> is an operation that runs whenever one or more tracked signals change. They are perfect for logging, DOM mutations, or syncing state.</p>
      
      <div style="margin: 2rem 0; padding: 1.5rem; background: #fff3cd; border-radius: 8px;">
        <p style="font-size: 1.25rem;">Current Theme: <strong>{{ theme() }}</strong></p>
        <p><em>(Every time you change the theme, an effect() logs it to the console)</em></p>
      </div>

      <div style="display: flex; gap: 10px;">
        <button (click)="setTheme('light')" style="padding: 0.5rem 1rem; cursor: pointer;">Light Theme</button>
        <button (click)="setTheme('dark')" style="padding: 0.5rem 1rem; cursor: pointer;">Dark Theme</button>
        <button (click)="setTheme('system')" style="padding: 0.5rem 1rem; cursor: pointer;">System Default</button>
      </div>
    </div>
  `
})
export class EffectSignalComponent {
  theme = signal<'light' | 'dark' | 'system'>('light');

  constructor() {
    // This effect runs on component initialization and subsequently whenever 'theme' changes.
    effect(() => {
      console.log(`[Effect] Theme changed to: ${this.theme()}`);
    });
  }

  setTheme(newTheme: 'light' | 'dark' | 'system') {
    this.theme.set(newTheme);
  }
}
