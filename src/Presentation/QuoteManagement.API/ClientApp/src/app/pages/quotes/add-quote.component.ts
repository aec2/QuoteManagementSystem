import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { ListboxModule } from 'primeng/listbox';

interface Book {
  id: string;
  title: string;
  author?: string;
  isbn?: string;
  coverImageUrl?: string;
  quoteCount: number;
}

interface Category {
  name: string;
  code: string;
}

@Component({
  selector: 'app-add-quote',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CardModule, ButtonModule, InputTextModule, InputNumberModule, MultiSelectModule, ToastModule, DividerModule, TagModule, DialogModule, ListboxModule],
  providers: [MessageService],
  templateUrl: './add-quote.component.html',
  styleUrls: ['./add-quote.component.scss']
})
export class AddQuoteComponent implements OnInit {
  quoteForm: FormGroup;
  selectedBook: Book | null = null;
  showBookSelection = false;
  books: Book[] = [];
  filteredBooks: Book[] = [];
  bookSearch = '';
  booksLoading = false;
  bookError = '';
  categories: Category[] = [];
  selectedCategories: Category[] = [];
  saving = false;
  showBookDialog = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {
    this.quoteForm = this.fb.group({
      quoteText: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      pageNumber: [null, [Validators.min(1), Validators.max(10000)]]
    });
  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state?.['selectedBook']) {
      this.selectedBook = navigation.extras.state['selectedBook'];
    } else {
      const state = window.history.state;
      if (state?.selectedBook) {
        this.selectedBook = state.selectedBook;
      } else {
        // No book selected, open book selection dialog
        this.openBookDialog();
        this.loadBooks();
      }
    }
    if (this.selectedBook) {
      this.loadCategories();
    }
  }

  private loadCategories() {
    this.categories = [
      { name: 'Aşk', code: 'love' },
      { name: 'Hayat', code: 'life' },
      { name: 'Felsefe', code: 'philosophy' },
      { name: 'Motivasyon', code: 'motivation' },
      { name: 'Dostluk', code: 'friendship' },
      { name: 'Bilgelik', code: 'wisdom' },
      { name: 'Cesaret', code: 'courage' },
      { name: 'Umut', code: 'hope' },
      { name: 'Özgürlük', code: 'freedom' },
      { name: 'Başarı', code: 'success' },
      { name: 'Zaman', code: 'time' },
      { name: 'Doğa', code: 'nature' },
      { name: 'Sanat', code: 'art' },
      { name: 'Bilim', code: 'science' },
      { name: 'Tarih', code: 'history' }
    ];
  }

  loadBooks() {
    this.booksLoading = true;
    this.bookError = '';
    // Simulate API call
    setTimeout(() => {
      // Simulate error: uncomment to test error UI
      // this.bookError = 'Kitaplar yüklenemedi.';
      this.books = [
        { id: '1', title: 'The Great Gatsby', quoteCount: 15, isbn: '9780743273565', coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg', author: 'F. Scott Fitzgerald' },
        { id: '2', title: 'To Kill a Mockingbird', quoteCount: 23, isbn: '9780061120084', coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg', author: 'Harper Lee' },
        { id: '3', title: '1984', quoteCount: 31, isbn: '9780452284234', coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780452284234-L.jpg', author: 'George Orwell' },
        { id: '4', title: 'Pride and Prejudice', quoteCount: 18, isbn: '9780141439518', coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg', author: 'Jane Austen' }
        // ... add more as needed
      ];
      this.filteredBooks = this.books;
      this.booksLoading = false;
    }, 1000);
  }

  filterBooks() {
    const search = this.bookSearch.toLowerCase();
    this.filteredBooks = this.books.filter(book =>
      book.title.toLowerCase().includes(search) ||
      (book.author && book.author.toLowerCase().includes(search)) ||
      (book.isbn && book.isbn.includes(search))
    );
  }

  openBookDialog() {
    this.showBookDialog = true;
    this.showBookSelection = false;
  }

  closeBookDialog() {
    this.showBookDialog = false;
  }

  onBookSelected(book: Book) {
    this.selectedBook = book;
    this.showBookDialog = false;
    this.loadCategories();
  }

  goBackToBookSelection() {
    // Open dialog for book selection
    this.selectedBook = null;
    this.openBookDialog();
    this.bookSearch = '';
    this.filteredBooks = this.books;
  }

  onSubmit() {
    if (this.quoteForm.valid && this.selectedBook) {
      this.saving = true;
      this.bookError = '';
      const quoteData = {
        bookId: this.selectedBook.id,
        bookTitle: this.selectedBook.title,
        author: this.selectedBook.author,
        quoteText: this.quoteForm.value.quoteText,
        pageNumber: this.quoteForm.value.pageNumber,
        categories: this.selectedCategories.map((cat) => cat.code)
      };
      // Simulate API call with error handling
      setTimeout(() => {
        if (quoteData.quoteText.includes('error')) {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata!',
            detail: 'Alıntı kaydedilemedi.',
            life: 3000
          });
          this.saving = false;
          return;
        }
        this.messageService.add({
          severity: 'success',
          summary: 'Başarılı!',
          detail: 'Alıntınız başarıyla eklendi.',
          life: 3000
        });
        this.saving = false;
        setTimeout(() => {
          this.router.navigate(['/pages/feed']);
        }, 1500);
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.quoteForm.controls).forEach((key) => {
      const control = this.quoteForm.get(key);
      control?.markAsTouched();
    });
  }

  cancel() {
    this.router.navigate(['/pages/feed']);
  }

  onBookCoverError(event: any) {
    event.target.src = '/demo/images/ecommerce/blue-book.jpg';
  }

  getCharacterCount(): number {
    return this.quoteForm.get('quoteText')?.value?.length || 0;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.quoteForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.quoteForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return `${fieldName} alanı zorunludur`;
      if (field.errors['minlength']) return `En az ${field.errors['minlength'].requiredLength} karakter olmalıdır`;
      if (field.errors['maxlength']) return `En fazla ${field.errors['maxlength'].requiredLength} karakter olabilir`;
      if (field.errors['min']) return `En küçük değer ${field.errors['min'].min} olmalıdır`;
      if (field.errors['max']) return `En büyük değer ${field.errors['max'].max} olmalıdır`;
    }
    return '';
  }
}
