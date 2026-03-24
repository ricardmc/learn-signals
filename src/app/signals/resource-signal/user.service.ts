import { Injectable, resource } from '@angular/core';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // We use the new resource() API to fetch data
  // The resource will automatically resolve a Promise and expose its state as signals (value, isLoading, error)
  usersResource = resource<User[], unknown>({
    loader: async ({ abortSignal }) => {
      // In a real application, make sure to handle abortSignals properly for cancellation!
      const resp = await fetch('https://jsonplaceholder.typicode.com/users', { signal: abortSignal });
      if (!resp.ok) {
        throw new Error('Failed to fetch users');
      }
      return await resp.json() as User[];
    }
  });

  // Expose a way to manually reload data
  reloadUsers() {
    this.usersResource.reload();
  }
}
