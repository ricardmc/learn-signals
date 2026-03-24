import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EffectSignalComponent } from './effect-signal.component';
import { provideRouter } from '@angular/router';

describe('EffectSignalComponent', () => {
  let component: EffectSignalComponent;
  let fixture: ComponentFixture<EffectSignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EffectSignalComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(EffectSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with light theme', () => {
    expect(component.theme()).toBe('light');
  });

  it('should update theme when setTheme is called', () => {
    component.setTheme('dark');
    expect(component.theme()).toBe('dark');
  });

  it('should run effect and log to console when theme changes', () => {
    const consoleSpy = spyOn(console, 'log');

    // Make sure we trigger change detection and effects
    component.setTheme('dark');
    fixture.detectChanges();
    TestBed.flushEffects();

    expect(consoleSpy).toHaveBeenCalledWith('[Effect] Theme changed to: dark');
  });
});
