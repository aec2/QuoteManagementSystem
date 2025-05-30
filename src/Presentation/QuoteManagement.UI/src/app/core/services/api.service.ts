import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Author, CreateAuthorRequest, UpdateAuthorRequest } from '../models/author.model';
import { Book, CreateBookRequest, UpdateBookRequest } from '../models/book.model';
import { Quote, CreateQuoteRequest, UpdateQuoteRequest } from '../models/quote.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Authors
  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.apiUrl}/authors`);
  }

  getAuthor(id: string): Observable<Author> {
    return this.http.get<Author>(`${this.apiUrl}/authors/${id}`);
  }

  createAuthor(request: CreateAuthorRequest): Observable<Author> {
    return this.http.post<Author>(`${this.apiUrl}/authors`, request);
  }

  updateAuthor(id: string, request: UpdateAuthorRequest): Observable<Author> {
    return this.http.put<Author>(`${this.apiUrl}/authors/${id}`, request);
  }

  deleteAuthor(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/authors/${id}`);
  }

  // Books
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/books`);
  }

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/books/${id}`);
  }

  createBook(request: CreateBookRequest): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/books`, request);
  }

  updateBook(id: string, request: UpdateBookRequest): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/books/${id}`, request);
  }

  deleteBook(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/books/${id}`);
  }

  // Quotes
  getQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>(`${this.apiUrl}/quotes`);
  }

  getQuote(id: string): Observable<Quote> {
    return this.http.get<Quote>(`${this.apiUrl}/quotes/${id}`);
  }

  createQuote(request: CreateQuoteRequest): Observable<Quote> {
    return this.http.post<Quote>(`${this.apiUrl}/quotes`, request);
  }

  updateQuote(id: string, request: UpdateQuoteRequest): Observable<Quote> {
    return this.http.put<Quote>(`${this.apiUrl}/quotes/${id}`, request);
  }

  deleteQuote(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/quotes/${id}`);
  }
}