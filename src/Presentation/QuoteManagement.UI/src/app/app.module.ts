import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuotesListComponent } from './features/quotes/quotes-list/quotes-list.component';
import { QuoteFormComponent } from './features/quotes/quote-form/quote-form.component';
import { AuthorsListComponent } from './features/authors/authors-list/authors-list.component';
import { AuthorFormComponent } from './features/authors/author-form/author-form.component';
import { BooksListComponent } from './features/books/books-list/books-list.component';
import { BookFormComponent } from './features/books/book-form/book-form.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    QuotesListComponent,
    QuoteFormComponent,
    AuthorsListComponent,
    AuthorFormComponent,
    BooksListComponent,
    BookFormComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }