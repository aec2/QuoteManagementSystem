import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuotesListComponent } from './features/quotes/quotes-list/quotes-list.component';
import { QuoteFormComponent } from './features/quotes/quote-form/quote-form.component';
import { AuthorsListComponent } from './features/authors/authors-list/authors-list.component';
import { AuthorFormComponent } from './features/authors/author-form/author-form.component';
import { BooksListComponent } from './features/books/books-list/books-list.component';
import { BookFormComponent } from './features/books/book-form/book-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/quotes', pathMatch: 'full' },
  { path: 'quotes', component: QuotesListComponent },
  { path: 'quotes/new', component: QuoteFormComponent },
  { path: 'quotes/edit/:id', component: QuoteFormComponent },
  { path: 'authors', component: AuthorsListComponent },
  { path: 'authors/new', component: AuthorFormComponent },
  { path: 'authors/edit/:id', component: AuthorFormComponent },
  { path: 'books', component: BooksListComponent },
  { path: 'books/new', component: BookFormComponent },
  { path: 'books/edit/:id', component: BookFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }