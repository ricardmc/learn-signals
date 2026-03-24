import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntrackedSignalComponent } from './untracked-signal.component';
import { provideRouter } from '@angular/router';

describe('UntrackedSignalComponent', () => {
  let component: UntrackedSignalComponent;
  let fixture: ComponentFixture<UntrackedSignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UntrackedSignalComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(UntrackedSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize trigger and silentValue to 0', () => {
    expect(component.trigger()).toBe(0);
    expect(component.silentValue()).toBe(0);
  });

  it('should only run effect when trigger is incremented, not when silent is incremented', () => {
    TestBed.flushEffects(); 
    const initialLogsLength = component.logs().length;
    
    // Increment silent value
    component.incrementSilent();
    fixture.detectChanges();
    TestBed.flushEffects();
    
    // Logs should NOT increase because silentValue is untracked
    expect(component.logs().length).toBe(initialLogsLength);
    
    // Increment trigger value
    component.incrementTrigger();
    fixture.detectChanges();
    TestBed.flushEffects();
    
    // Logs SHOULD increase now
    expect(component.logs().length).toBe(initialLogsLength + 1);
    
    // The latest log should correctly record the silent value
    const latestLog = component.logs()[component.logs().length - 1];
    expect(latestLog).toContain('Read silent value: 1');
  });
});
