import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkedSignalComponent } from './linked-signal.component';
import { provideRouter } from '@angular/router';

describe('LinkedSignalComponent', () => {
  let component: LinkedSignalComponent;
  let fixture: ComponentFixture<LinkedSignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkedSignalComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(LinkedSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should compute initial linked value based on source', () => {
    expect(component.selectedCategory()).toBe('Fruits');
    expect(component.activeItem()).toBe('Apple');
  });

  it('should allow overwriting the linked signal manually', () => {
    component.overrideItem('Banana');
    expect(component.activeItem()).toBe('Banana');
  });

  it('should reset the linked signal back to computed when source changes', () => {
    // Manual overwrite
    component.overrideItem('Banana');
    expect(component.activeItem()).toBe('Banana');

    // Change source dependency
    component.selectedCategory.set('Vegetables');
    
    // The linkedSignal should automatically reset to its computed logic because the source triggered recalculation
    expect(component.activeItem()).toBe('Broccoli');
  });
});
