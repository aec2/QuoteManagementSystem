import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./booklist.component').then(m => m.BookList),
    data: { breadcrumb: 'Books' }
  },
  {
    path: ':id',
    loadComponent: () => import('./book-detail.component').then(m => m.BookDetailComponent),
    data: { breadcrumb: 'Book Detail' }
  }
] as Routes; 