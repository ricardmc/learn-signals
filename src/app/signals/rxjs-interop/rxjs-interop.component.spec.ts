import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RxjsInteropComponent } from './rxjs-interop.component';
import { provideRouter } from '@angular/router';

describe('RxjsInteropComponent', () => {
  let component: RxjsInteropComponent;
  let fixture: ComponentFixture<RxjsInteropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsInteropComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(RxjsInteropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize toSignal correctly', () => {
    // Initially toSignal starts as undefined if no initialValue is provided
    expect(component.timerSignal()).toBeUndefined();
  });

  it('should track signal updates emitted as an Observable', () => {
    const currentLength = component.emissionLogs().length;
    
    // Update the signal
    component.searchSignal.set('testing');
    fixture.detectChanges();
    TestBed.flushEffects(); 

    // Because toObservable emits asynchronously during change detection / microtasks, flush effects
    expect(component.emissionLogs()[component.emissionLogs().length - 1]).toContain('testing');
  });
});
