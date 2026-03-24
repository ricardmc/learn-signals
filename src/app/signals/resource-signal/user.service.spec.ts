import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call fetch to load users', async () => {
    // Mock global fetch to prevent actual HTTP calls in the test
    const mockUsers = [{ id: 1, name: 'Mock User', email: 'mock@test.com' }];
    spyOn(window, 'fetch').and.resolveTo(new Response(JSON.stringify(mockUsers), { status: 200 }));
    
    // We force read the resource value to trigger the initial load if it was lazy
    service.usersResource.value();

    // Since it's async, we flush the microtask queue
    await new Promise(resolve => setTimeout(resolve, 10));
    
    expect(window.fetch).toHaveBeenCalled();
  });
});
