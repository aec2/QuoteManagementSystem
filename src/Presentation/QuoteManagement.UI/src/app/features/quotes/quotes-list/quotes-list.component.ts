import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { Quote } from '../../../core/models/quote.model';
import { MenuItem, ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-quotes-list',
  templateUrl: './quotes-list.component.html',
  styleUrls: ['./quotes-list.component.scss']
})
export class QuotesListComponent implements OnInit {
  quotes: Quote[] = [];
  loading = true;
  error: string | null = null;
  searchTerm = '';
  speedDialItems: MenuItem[] = [
    { icon: 'pi pi-plus', command: () => this.router.navigate(['/quotes/new']) }
  ];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadQuotes();
  }

  get filteredQuotes(): Quote[] {
    const term = this.searchTerm.toLowerCase();
    return this.quotes.filter(q =>
      q.text.toLowerCase().includes(term) ||
      q.authorName.toLowerCase().includes(term) ||
      q.bookTitle.toLowerCase().includes(term)
    );
  }

  loadQuotes(): void {
    this.loading = true;
    this.apiService.getQuotes().subscribe({
      next: (quotes) => {
        this.quotes = quotes;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load quotes. Please try again later.';
        this.loading = false;
      }
    });
  }

  editQuote(id: string): void {
    this.router.navigate(['/quotes/edit', id]);
  }

  deleteQuote(id: string): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this quote?',
      accept: () => {
        this.apiService.deleteQuote(id).subscribe({
          next: () => {
            this.quotes = this.quotes.filter(quote => quote.id !== id);
            this.messageService.add({ severity: 'success', summary: 'Quote deleted' });
          },
          error: () => {
            this.error = 'Failed to delete quote. Please try again later.';
          }
        });
      }
    });
  }
}
