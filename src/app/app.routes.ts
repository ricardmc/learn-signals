import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./index/index.component').then(m => m.IndexComponent) },
  { path: 'signals/basic', loadComponent: () => import('./signals/basic-signal/basic-signal.component').then(m => m.BasicSignalComponent) },
  { path: 'signals/computed', loadComponent: () => import('./signals/computed-signal/computed-signal.component').then(m => m.ComputedSignalComponent) },
  { path: 'signals/effect', loadComponent: () => import('./signals/effect-signal/effect-signal.component').then(m => m.EffectSignalComponent) },
  { path: 'signals/untracked', loadComponent: () => import('./signals/untracked-signal/untracked-signal.component').then(m => m.UntrackedSignalComponent) },
  { path: 'signals/resource', loadComponent: () => import('./signals/resource-signal/resource-signal.component').then(m => m.ResourceSignalComponent) }
];
