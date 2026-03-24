import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs-interop',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div style="padding: 2rem; font-family: sans-serif;">
      <a routerLink="/" style="display: inline-block; margin-bottom: 1.5rem; color: #666; text-decoration: none;">&larr; Back to Index</a>
      
      <h2>6. RxJS Interop: toSignal & toObservable</h2>
      <p>Angular provides <code>toSignal()</code> and <code>toObservable()</code> to seamlessly bridge the gap between reactive RxJS streams and Signals.</p>
      
      <div style="margin: 2rem 0; padding: 1.5rem; background: #e0f2f1; border-radius: 8px;">
        <h3>toSignal() (Observable -> Signal)</h3>
        <p>This automatically subscribes to an observable and cleans it up when the component is destroyed.</p>
        <p style="font-size: 1.25rem; color: #00695c;">Timer Observable value as Signal: <strong>{{ timerSignal() ?? 'Waiting...' }}</strong></p>
      </div>

      <div style="margin: 2rem 0; padding: 1.5rem; background: #e3f2fd; border-radius: 8px;">
        <h3>toObservable() (Signal -> Observable)</h3>
        <p>This turns a signal into an observable stream.</p>
        <p style="font-size: 1.25rem; color: #1565c0;">Current Search: <strong>{{ searchSignal() }}</strong></p>
        
        <input 
          type="text" 
          [value]="searchSignal()" 
          (input)="updateSearch($event)" 
          placeholder="Type to trigger observable emit..."
          style="padding: 0.5rem; width: 100%; max-width: 300px; margin-top: 1rem;"
        />
        
        <div style="margin-top: 1rem; padding: 1rem; border: 1px dashed #666; min-height: 80px;">
          <strong>Observable Emits:</strong>
          <ul style="margin-top: 0.5rem;">
            @for (log of emissionLogs(); track $index) {
              <li>{{ log }}</li>
            }
          </ul>
        </div>
      </div>
    </div>
  `
})
export class RxjsInteropComponent {
  // 1. toSignal: Map an interval observable to a signal
  timer$ = interval(1000).pipe(map(v => v + 1));
  timerSignal = toSignal(this.timer$); 

  // 2. toObservable: Map a signal to an observable
  searchSignal = signal('');
  searchObservable$: Observable<string> = toObservable(this.searchSignal);

  emissionLogs = signal<string[]>([]);

  constructor() {
    // Subscribe to the observable generated from the signal
    this.searchObservable$.subscribe(value => {
      this.emissionLogs.update(logs => [...logs, `Emitted via RxJS: "${value}"`]);
    });
  }

  updateSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchSignal.set(target.value);
  }
}
