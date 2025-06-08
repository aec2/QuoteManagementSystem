import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { Author } from '../../../core/models/author.model';
import { Book } from '../../../core/models/book.model';
import { MessageService } from 'primeng/api';

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
  quoteId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.quoteForm = this.fb.group({
      text: ['', [Validators.required, Validators.maxLength(5000)]],
      authorId: [''],
      authorName: [''],
      bookId: [''],
      bookTitle: [''],
      isbn: [''],
      pageNumber: [null, [Validators.min(1)]]
    });

    // Add custom validator to ensure either authorId or authorName is provided
    // this.quoteForm.addValidators(this.authorValidator);
  }

  ngOnInit(): void {
    this.loadAuthorsAndBooks();
    
    this.quoteId = this.route.snapshot.paramMap.get('id');
    if (this.quoteId) {
      this.isEditing = true;
      this.loadQuote(this.quoteId);
    }

    // Clear authorName when authorId is selected
    this.quoteForm.get('authorId')?.valueChanges.subscribe(value => {
      if (value) {
        this.quoteForm.get('authorName')?.setValue('');
      }
    });

    // Clear bookTitle and isbn when bookId is selected
    this.quoteForm.get('bookId')?.valueChanges.subscribe(value => {
      if (value) {
        this.quoteForm.get('bookTitle')?.setValue('');
        this.quoteForm.get('isbn')?.setValue('');
      }
    });
  }

  // Custom validator to ensure either authorId or authorName is provided
  private authorValidator(form: FormGroup) {
    const authorId = form.get('authorId')?.value;
    const authorName = form.get('authorName')?.value;
    
    if (!authorId && !authorName?.trim()) {
      return { authorRequired: true };
    }
    return null;
  }

  loadAuthorsAndBooks(): void {
    this.apiService.getAuthors().subscribe({
      next: (authors) => this.authors = authors,
      error: (error) => {
        console.error('Error loading authors:', error);
        this.error = 'Failed to load authors';
      }
    });
    
    this.apiService.getBooks().subscribe({
      next: (books) => this.books = books,
      error: (error) => {
        console.error('Error loading books:', error);
        this.error = 'Failed to load books';
      }
    });
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
        console.error('Error loading quote:', error);
        this.error = 'Failed to load quote';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.quoteForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    const formValue = this.quoteForm.value;
    this.loading = true;
    this.error = null;

    if (this.isEditing && this.quoteId) {
      const updateRequest = {
        text: formValue.text,
        pageNumber: formValue.pageNumber || undefined
      };

      this.apiService.updateQuote(this.quoteId, updateRequest).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Quote updated' });
          this.router.navigate(['/quotes']);
        },
        error: (error) => {
          console.error('Error updating quote:', error);
          this.error = 'Failed to update quote. Please try again.';
          this.loading = false;
        }
      });
    } else {
      // Clean up the form data before sending
      const createRequest = {
        text: formValue.text,
        authorId: formValue.authorId || undefined,
        authorName: formValue.authorName?.trim() || undefined,
        bookId: formValue.bookId || undefined,
        bookTitle: formValue.bookTitle?.trim() || undefined,
        isbn: formValue.isbn?.trim() || undefined,
        pageNumber: formValue.pageNumber || undefined
      };

      this.apiService.createQuote(createRequest).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Quote created' });
          this.router.navigate(['/quotes']);
        },
        error: (error) => {
          console.error('Error creating quote:', error);
          this.error = 'Failed to create quote. Please try again.';
          this.loading = false;
        }
      });
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.quoteForm.controls).forEach(key => {
      const control = this.quoteForm.get(key);
      control?.markAsTouched();
    });
  }

  get isFormInvalid(): boolean {
    return this.quoteForm.invalid;
  }

  get hasAuthorError(): boolean {
    const authorId = this.quoteForm.get('authorId')?.value;
    const authorName = this.quoteForm.get('authorName')?.value;
    return this.quoteForm.hasError('authorRequired') && this.quoteForm.touched;
  }
}