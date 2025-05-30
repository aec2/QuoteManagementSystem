import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { Author } from '../../../core/models/author.model';
import { Book } from '../../../core/models/book.model';

@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.scss']
})
export class QuoteFormComponent implements OnInit {
  quoteForm: FormGroup;
  authors: Author[] = [];
  books: Book[] = [];
  isEditing = false;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.quoteForm = this.fb.group({
      text: ['', [Validators.required, Validators.maxLength(5000)]],
      authorId: [''],
      authorName: [''],
      bookId: [''],
      bookTitle: [''],
      isbn: [''],
      pageNumber: [null]
    });
  }

  ngOnInit(): void {
    this.loadAuthorsAndBooks();
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.loadQuote(id);
    }
  }

  loadAuthorsAndBooks(): void {
    this.apiService.getAuthors().subscribe(authors => this.authors = authors);
    this.apiService.getBooks().subscribe(books => this.books = books);
  }

  loadQuote(id: string): void {
    this.loading = true;
    this.apiService.getQuote(id).subscribe({
      next: (quote) => {
        this.quoteForm.patchValue({
          text: quote.text,
          authorId: quote.authorId,
          bookId: quote.bookId,
          pageNumber: quote.pageNumber
        });
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load quote';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.quoteForm.invalid) return;

    const formValue = this.quoteForm.value;
    this.loading = true;

    if (this.isEditing) {
      const id = this.route.snapshot.paramMap.get('id')!;
      const updateRequest = {
        text: formValue.text,
        pageNumber: formValue.pageNumber
      };

      this.apiService.updateQuote(id, updateRequest).subscribe({
        next: () => this.router.navigate(['/quotes']),
        error: (error) => {
          this.error = 'Failed to update quote';
          this.loading = false;
        }
      });
    } else {
      this.apiService.createQuote(formValue).subscribe({
        next: () => this.router.navigate(['/quotes']),
        error: (error) => {
          this.error = 'Failed to create quote';
          this.loading = false;
        }
      });
    }
  }
}