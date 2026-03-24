import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResourceSignalComponent } from './resource-signal.component';
import { UserService } from './user.service';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';

describe('ResourceSignalComponent', () => {
  let component: ResourceSignalComponent;
  let fixture: ComponentFixture<ResourceSignalComponent>;
  let mockUserService: Partial<UserService>;

  beforeEach(async () => {
    // We mock the service's resource to have standard signal behavior for easy template testing
    mockUserService = {
      usersResource: {
        isLoading: signal(false),
        value: signal([{ id: 1, name: 'Alice Mock', email: 'alice@mock.com' }]),
        error: signal(undefined),
        reload: jasmine.createSpy('reload')
      } as any,
      reloadUsers: jasmine.createSpy('reloadUsers')
    };

    await TestBed.configureTestingModule({
      imports: [ResourceSignalComponent],
      providers: [
        provideRouter([]),
        // Override the actual service with our mock
        { provide: UserService, useValue: mockUserService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ResourceSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the mocked users from the service', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Alice Mock');
    expect(compiled.textContent).toContain('alice@mock.com');
  });

  it('should call reloadUsers on the service when the button is clicked', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');
    button?.click();
    expect(mockUserService.reloadUsers).toHaveBeenCalled();
  });
});
