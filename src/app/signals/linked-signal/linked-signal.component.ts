import { Component, linkedSignal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-linked-signal',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div style="padding: 2rem; font-family: sans-serif;">
      <a routerLink="/" style="display: inline-block; margin-bottom: 1.5rem; color: #666; text-decoration: none;">&larr; Back to Index</a>
      
      <h2>7. Linked Signals Example (Angular 19+)</h2>
      <p>A <code>linkedSignal()</code> creates a writable signal that derives its initial or default value from other signals. When its source dependencies change, it resets its value back to the derived function.</p>
      
      <div style="margin: 2rem 0; padding: 1.5rem; background: #fff3e0; border-radius: 8px;">
        <div style="margin-bottom: 1rem;">
          <label style="font-weight: bold; margin-right: 1rem;">Select Category (Source Signal):</label>
          <select [value]="selectedCategory()" (change)="changeCategory($event)" style="padding: 0.5rem;">
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
          </select>
        </div>

        <p style="font-size: 1.25rem;">Active Editing Item (Linked Signal): 
          <strong>{{ activeItem() }}</strong>
        </p>

        <div style="display: flex; gap: 10px; margin-top: 1rem;">
          <button (click)="overrideItem('Banana')" style="padding: 0.5rem 1rem; cursor: pointer;">Write Banana to Linked Signal</button>
          <button (click)="overrideItem('Carrot')" style="padding: 0.5rem 1rem; cursor: pointer;">Write Carrot to Linked Signal</button>
        </div>
      </div>
      
      <div style="background: #eef2f5; padding: 1rem; border-radius: 8px;">
        <p><strong>How it works:</strong> The active item defaults to the first item matching the category. You can manually overwrite the linkedSignal as if it were a normal WritableSignal. However, when you change the Category source dropdown, the <code>linkedSignal</code> recalculates and automatically resets back to the new category's default item!</p>
      </div>
    </div>
  `
})
export class LinkedSignalComponent {
  // Source signal
  selectedCategory = signal<'Fruits' | 'Vegetables'>('Fruits');

  // Linked signal maps the selectedCategory to a default item.
  activeItem = linkedSignal({
    source: this.selectedCategory,
    computation: (category): string => category === 'Fruits' ? 'Apple' : 'Broccoli'
  });

  changeCategory(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedCategory.set(select.value as 'Fruits' | 'Vegetables');
  }

  overrideItem(item: string) {
    // Overwrite the linked signal completely manually
    this.activeItem.set(item);
  }
}
