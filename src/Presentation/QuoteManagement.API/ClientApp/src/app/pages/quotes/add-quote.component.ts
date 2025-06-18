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
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CardModule, ButtonModule, InputTextModule, InputNumberModule, MultiSelectModule, ToastModule, DividerModule, TagModule],
  providers: [MessageService],
  templateUrl: './add-quote.component.html',
  styleUrls: ['./add-quote.component.scss']
})
export class AddQuoteComponent implements OnInit {
  quoteForm: FormGroup;
  selectedBook: Book | null = null;
  categories: Category[] = [];
  selectedCategories: Category[] = [];
  saving = false;

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
    // Get selected book from navigation state
    const navigation = this.router.getCurrentNavigation();
    console.log(navigation);
    if (navigation?.extras.state?.['selectedBook']) {
      this.selectedBook = navigation.extras.state['selectedBook'];
    } else {
      // Check if book data is in history state
      const state = window.history.state;
      if (state?.selectedBook) {
        this.selectedBook = state.selectedBook;
      } else {
        // No book selected, redirect back to feed
        this.router.navigate(['/pages/feed']);
        return;
      }
    }

    this.loadCategories();
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

  onSubmit() {
    if (this.quoteForm.valid && this.selectedBook) {
      this.saving = true;

      const quoteData = {
        bookId: this.selectedBook.id,
        bookTitle: this.selectedBook.title,
        author: this.selectedBook.author,
        quoteText: this.quoteForm.value.quoteText,
        pageNumber: this.quoteForm.value.pageNumber,
        categories: this.selectedCategories.map((cat) => cat.code)
      };

      // Simulate API call
      setTimeout(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Başarılı!',
          detail: 'Alıntınız başarıyla eklendi.',
          life: 3000
        });

        this.saving = false;

        // Navigate back to feed after successful save
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

  goBackToBookSelection() {
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
