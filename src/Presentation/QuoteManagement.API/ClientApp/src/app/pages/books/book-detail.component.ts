import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { RatingModule } from 'primeng/rating';
import { DividerModule } from 'primeng/divider';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { Subject, takeUntil } from 'rxjs';
import { BookService, BookWithQuotes, Quote } from '../../services/book.service';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    ChipModule,
    RippleModule,
    SkeletonModule,
    TagModule,
    TooltipModule,
    RatingModule,
    DividerModule,
    MessagesModule,
    MessageModule
  ],
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit, OnDestroy {
  book: BookWithQuotes | null = null;
  isLoading: boolean = true;
  error: string | null = null;
  bookId: string = '';
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit() {
    this.route.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      this.bookId = params['id'];
      this.loadBook();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadBook() {
    this.isLoading = true;
    this.error = null;
    
    this.bookService.getBook(this.bookId).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (book) => {
        this.book = book;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to load book details';
        this.isLoading = false;
      }
    });
  }

  onImageError(event: any) {
    event.target.src = '/demo/images/ecommerce/blue-book.jpg';
  }

  goBack() {
    this.router.navigate(['/books']);
  }

  addQuote() {
    if (this.book) {
      this.router.navigate(['/quotes/add'], {
        state: { selectedBook: this.book }
      });
    }
  }

  shareBook() {
    console.log('share book');
  }

  toggleFavorite(quote: Quote) {
    quote.isFavorite = !quote.isFavorite;
    // In a real app, you would call a service to update this
  }

  getStatusColor(status?: string): 'info' | 'success' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    switch (status) {
      case 'read': return 'success';
      case 'reading': return 'info';
      case 'want-to-read': return 'warn';
      default: return 'secondary';
    }
  }

  getStatusLabel(status?: string): string {
    switch (status) {
      case 'read': return 'To Read';
      case 'reading': return 'Reading';
      case 'want-to-read': return 'Want to Read';
      default: return 'Unknown';
    }
  }

  getRatingColor(rating: number): string {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.5) return 'text-yellow-600';
    return 'text-gray-600';
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  }

  trackByQuoteId(index: number, quote: Quote): string {
    return quote.id;
  }
} 