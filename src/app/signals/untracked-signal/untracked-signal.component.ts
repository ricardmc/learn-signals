import { Component, effect, signal, untracked } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-untracked-signal',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div style="padding: 2rem; font-family: sans-serif;">
      <a routerLink="/" style="display: inline-block; margin-bottom: 1.5rem; color: #666; text-decoration: none;">&larr; Back to Index</a>
      
      <h2>4. Untracked Signals Example</h2>
      <p>The <code>untracked()</code> function allows you to read a signal's value without creating a reactive dependency. It's useful inside <code>effect()</code> or <code>computed()</code> when you only want to react to <i>some</i> signals.</p>
      
      <div style="margin: 2rem 0; padding: 1.5rem; background: #e2e3e5; border-radius: 8px;">
        <p style="font-size: 1.25rem;">Trigger: <strong>{{ trigger() }}</strong></p>
        <p style="font-size: 1.25rem;">Silent Value: <strong>{{ silentValue() }}</strong></p>
      </div>

      <div style="display: flex; gap: 10px; margin-bottom: 2rem;">
        <button (click)="incrementTrigger()" style="padding: 0.5rem 1rem; cursor: pointer;">Increment Trigger</button>
        <button (click)="incrementSilent()" style="padding: 0.5rem 1rem; cursor: pointer;">Increment Silent</button>
      </div>
      
      <div style="padding: 1rem; border: 1px dashed #999;">
        <strong>Effect Logs:</strong>
        <p style="font-size: 0.9rem; color: #666;">(Notice how clicking 'Increment Silent' does not create a new log until you click 'Increment Trigger')</p>
        <ul style="margin-top: 0.5rem;">
          @for (log of logs(); track $index) {
            <li style="margin-bottom: 0.25rem;">{{ log }}</li>
          }
        </ul>
      </div>
    </div>
  `
})
export class UntrackedSignalComponent {
  trigger = signal(0);
  silentValue = signal(0);
  logs = signal<string[]>([]);

  constructor() {
    effect(() => {
      // This effect ONLY re-runs when 'trigger' changes because 'silentValue' is wrapped in untracked()
      const t = this.trigger();
      const s = untracked(() => this.silentValue());
      
      const newLog = `[Effect trigger: ${t}] Read silent value: ${s}`;
      
      // We also update the logs array (using untracked internally to avoid circular dependencies if we read it)
      untracked(() => {
        this.logs.update(l => [...l, newLog]);
      });
    });
  }

  incrementTrigger() {
    this.trigger.update(v => v + 1);
  }

  incrementSilent() {
    this.silentValue.update(v => v + 1);
  }
}
