
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { RippleModule } from 'primeng/ripple';

interface Book {
    id: string;
    title: string;
    isbn: string;
    coverImageUrl: string;
    quoteCount: number;
    description?: string;
    author?: string;
    publishedYear?: number;
    genre?: string[];
}

@Component({
    selector: 'app-book-detail',
    standalone: true,
    imports: [CommonModule, ButtonModule, CardModule, ChipModule, RippleModule],
    template: `
        <div class="card">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Book Cover -->
                <div class="lg:col-span-1">
                    <div class="sticky top-4">
                        <div class="aspect-[3/4] w-full max-w-md mx-auto overflow-hidden rounded-lg shadow-xl">
                            <img 
                                [src]="book.coverImageUrl || '/demo/images/ecommerce/blue-book.jpg'" 
                                [alt]="book.title"
                                class="w-full h-full object-cover"
                                (error)="onImageError($event)"
                            />
                        </div>
                        <div class="mt-6 flex flex-col gap-3">
                            <button pButton pRipple label="View All Quotes" icon="pi pi-quote-left" class="p-button-primary w-full"></button>
                            <button pButton pRipple label="Add Quote" icon="pi pi-plus" class="p-button-outlined w-full"></button>
                        </div>
                    </div>
                </div>
                
                <!-- Book Information -->
                <div class="lg:col-span-2">
                    <div class="mb-6">
                        <h1 class="text-4xl font-bold text-surface-900 dark:text-surface-0 mb-4">{{ book.title }}</h1>
                        <p class="text-xl text-surface-600 dark:text-surface-400 mb-4" *ngIf="book.author">by {{ book.author }}</p>
                        
                        <div class="flex flex-wrap gap-4 mb-6">
                            <div class="flex items-center gap-2" *ngIf="book.isbn">
                                <i class="pi pi-bookmark text-surface-600 dark:text-surface-400"></i>
                                <span class="text-surface-700 dark:text-surface-300">ISBN: {{ book.isbn }}</span>
                            </div>
                            <div class="flex items-center gap-2" *ngIf="book.publishedYear">
                                <i class="pi pi-calendar text-surface-600 dark:text-surface-400"></i>
                                <span class="text-surface-700 dark:text-surface-300">Published: {{ book.publishedYear }}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <i class="pi pi-quote-left text-surface-600 dark:text-surface-400"></i>
                                <span class="text-surface-700 dark:text-surface-300">{{ book.quoteCount }} quotes</span>
                            </div>
                        </div>
                        
                        <div class="mb-6" *ngIf="book.genre && book.genre.length">
                            <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0 mb-3">Genres</h3>
                            <div class="flex flex-wrap gap-2">
                                <p-chip *ngFor="let g of book.genre" [label]="g" styleClass="p-chip-outlined"></p-chip>
                            </div>
                        </div>
                        
                        <div *ngIf="book.description">
                            <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0 mb-3">Description</h3>
                            <p class="text-surface-700 dark:text-surface-300 leading-relaxed">{{ book.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .aspect-[3/4] {
            aspect-ratio: 3/4;
        }
    `]
})
export class BookDetail implements OnInit {
    book: Book = {
        id: '1',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        isbn: '978-0-7432-7356-5',
        coverImageUrl: '/demo/images/books/great-gatsby.jpg',
        publishedYear: 1925,
        quoteCount: 15,
        genre: ['Classic', 'Fiction', 'American Literature'],
        description: 'The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on prosperous Long Island and in New York City, the novel tells the story of Jay Gatsby, a mysterious millionaire who throws lavish parties in hopes of winning back his lost love, Daisy Buchanan.'
    };

    ngOnInit() {
        // This would typically load book data based on route parameters
    }

    onImageError(event: any) {
        event.target.src = '/demo/images/ecommerce/blue-book.jpg';
    }
}
