import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasicSignalComponent } from './basic-signal.component';
import { provideRouter } from '@angular/router';

describe('BasicSignalComponent', () => {
  let component: BasicSignalComponent;
  let fixture: ComponentFixture<BasicSignalComponent>;

  beforeEach(async () => {
    // We configure the test module. The component is standalone, so it goes in imports.
    // We provide dummy routing setup since it uses RouterLink.
    await TestBed.configureTestingModule({
      imports: [BasicSignalComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(BasicSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with count 0', () => {
    // Reading the signal is as simple as calling it
    expect(component.count()).toBe(0);
    
    // Testing the rendered output
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('strong')?.textContent).toBe('0');
  });

  it('should update() the signal when incrementing / decrementing', () => {
    component.increment();
    expect(component.count()).toBe(1);
    
    component.decrement();
    expect(component.count()).toBe(0);
  });

  it('should set() the signal when resetting', () => {
    // Setting up non-zero state
    component.count.set(42);
    expect(component.count()).toBe(42);
    
    // Call the reset method
    component.reset();
    expect(component.count()).toBe(0);
  });
});
