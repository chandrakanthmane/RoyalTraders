import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about-us/about-us').then((m) => m.AboutUs),
  },
  {
    path: 'print',
    loadComponent: () => import('./pages/print-services/print-services').then((m) => m.PrintServices),
  },
  {
    path: 'packaging',
    loadComponent: () => import('./pages/packaging/packaging').then((m) => m.Packaging),
  },
  {
    path: 'security',
    loadComponent: () => import('./pages/security-solutions/security-solutions').then((m) => m.SecuritySolutions),
  },
  {
    path: 'blogs',
    loadComponent: () => import('./pages/blogs/blogs').then((m) => m.Blogs),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact-us/contact-us').then((m) => m.ContactUs),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
