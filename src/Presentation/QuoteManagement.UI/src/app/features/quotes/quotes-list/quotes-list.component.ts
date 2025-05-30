import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { Quote } from '../../../core/models/quote.model';

@Component({
  selector: 'app-quotes-list',
  templateUrl: './quotes-list.component.html',
  styleUrls: ['./quotes-list.component.scss']
})
export class QuotesListComponent implements OnInit {
  quotes: Quote[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadQuotes();
  }

  loadQuotes(): void {
    this.loading = true;
    this.apiService.getQuotes().subscribe({
      next: (quotes) => {
        this.quotes = quotes;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load quotes. Please try again later.';
        this.loading = false;
      }
    });
  }

  editQuote(id: string): void {
    this.router.navigate(['/quotes/edit', id]);
  }

  deleteQuote(id: string): void {
    if (confirm('Are you sure you want to delete this quote?')) {
      this.apiService.deleteQuote(id).subscribe({
        next: () => {
          this.quotes = this.quotes.filter(quote => quote.id !== id);
        },
        error: (error) => {
          this.error = 'Failed to delete quote. Please try again later.';
        }
      });
    }
  }
}