import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-computed-signal',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div style="padding: 2rem; font-family: sans-serif;">
      <a routerLink="/" style="display: inline-block; margin-bottom: 1.5rem; color: #666; text-decoration: none;">&larr; Back to Index</a>
      
      <h2>2. Computed Signals Example</h2>
      <p>A <code>computed()</code> signal derives its value from other signals. It is lazily evaluated and memoized, recalculating only when its dependencies change.</p>
      
      <div style="margin: 2rem 0; padding: 1.5rem; background: #eef2f5; border-radius: 8px;">
        <p style="font-size: 1.25rem;">Price: <strong>\${{ price() }}</strong></p>
        <p style="font-size: 1.25rem;">Quantity: <strong>{{ quantity() }}</strong></p>
        <hr style="margin: 1rem 0; border: none; border-top: 1px solid #ccc;" />
        <p style="font-size: 1.5rem; color: #0056b3;">Total Cost: <strong>\${{ totalCost() }}</strong></p>
      </div>

      <div style="display: flex; gap: 10px;">
        <button (click)="increaseQuantity()" style="padding: 0.5rem 1rem; cursor: pointer;">Increase Quantity</button>
        <button (click)="decreaseQuantity()" style="padding: 0.5rem 1rem; cursor: pointer;">Decrease Quantity</button>
      </div>
    </div>
  `
})
export class ComputedSignalComponent {
  price = signal(15.99);
  quantity = signal(1);

  // Computed signal depends on both 'price' and 'quantity'
  totalCost = computed(() => {
    // Math.round is used here to avoid floating point precision issues when rendering
    return Math.round(this.price() * this.quantity() * 100) / 100;
  });

  increaseQuantity() {
    this.quantity.update(q => q + 1);
  }

  decreaseQuantity() {
    this.quantity.update(q => Math.max(0, q - 1));
  }
}
