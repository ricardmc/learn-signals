import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComputedSignalComponent } from './computed-signal.component';
import { provideRouter } from '@angular/router';

describe('ComputedSignalComponent', () => {
  let component: ComputedSignalComponent;
  let fixture: ComponentFixture<ComputedSignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComputedSignalComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ComputedSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate initial total cost correctly', () => {
    expect(component.totalCost()).toBe(15.99);
  });

  it('should update total cost when quantity changes', () => {
    component.increaseQuantity();
    expect(component.quantity()).toBe(2);
    expect(component.totalCost()).toBe(31.98); // 15.99 * 2
    
    component.decreaseQuantity();
    expect(component.quantity()).toBe(1);
    expect(component.totalCost()).toBe(15.99);
  });
  
  it('should not allow negative quantities', () => {
    component.decreaseQuantity(); // 1 -> 0
    expect(component.quantity()).toBe(0);
    expect(component.totalCost()).toBe(0);
    
    component.decreaseQuantity(); // 0 -> 0
    expect(component.quantity()).toBe(0);
  });
  
  it('should trigger reactivity correctly on the rendered template', () => {
    component.increaseQuantity();
    fixture.detectChanges(); // Update the DOM
    const compiled = fixture.nativeElement as HTMLElement;
    const contents = compiled.querySelectorAll('strong');
    
    // Check if the third strong tag contains the updated totalCost
    expect(contents[2].textContent).toBe('$31.98');
  });
});
