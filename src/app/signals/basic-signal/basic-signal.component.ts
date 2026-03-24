import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-basic-signal',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div style="padding: 2rem; font-family: sans-serif;">
      <a routerLink="/" style="display: inline-block; margin-bottom: 1.5rem; color: #666; text-decoration: none;">&larr; Back to Index</a>
      
      <h2>1. Basic signal() Example</h2>
      <p>A <code>signal()</code> creates a WritableSignal. You can read its value by calling it like a function: <code>count()</code>. You can change it using <code>set()</code> or <code>update()</code>.</p>
      
      <div style="margin: 2rem 0; padding: 1.5rem; background: #f5f5f5; border-radius: 8px;">
        <p style="font-size: 1.25rem;">Current Count: <strong>{{ count() }}</strong></p>
      </div>

      <div style="display: flex; gap: 10px;">
        <button (click)="increment()" style="padding: 0.5rem 1rem; cursor: pointer;">Increment (update)</button>
        <button (click)="decrement()" style="padding: 0.5rem 1rem; cursor: pointer;">Decrement (update)</button>
        <button (click)="reset()" style="padding: 0.5rem 1rem; cursor: pointer;">Reset to 0 (set)</button>
      </div>
    </div>
  `
})
export class BasicSignalComponent {
  // Create a writable signal
  count = signal<number>(0);

  increment() {
    // update() allows you to change the value based on the previous value
    this.count.update(c => c + 1);
  }

  decrement() {
    this.count.update(c => c - 1);
  }

  reset() {
    // set() allows you to directly assign a new value
    this.count.set(0);
  }
}
