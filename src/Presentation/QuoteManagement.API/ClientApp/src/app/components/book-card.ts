
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

interface Book {
    id: string;
    title: string;
    isbn?: string;
    coverImageUrl?: string;
    quoteCount: number;
    author?: string;
}

@Component({
    selector: 'app-book-card',
    standalone: true,
    imports: [CommonModule, ButtonModule, RippleModule],
    template: `
        <div class="book-card group cursor-pointer" (click)="onBookClick()">
            <div class="relative overflow-hidden rounded-lg shadow-md">
                <!-- Book Cover -->
                <div class="aspect-[2/3] bg-surface-100 dark:bg-surface-800">
                    <img 
                        [src]="book.coverImageUrl || defaultCoverUrl" 
                        [alt]="book.title"
                        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        (error)="onImageError($event)"
                    />
                </div>
                
                <!-- Overlay on hover -->
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <button 
                        pButton 
                        pRipple 
                        icon="pi pi-eye" 
                        class="p-button-rounded p-button-outlined p-button-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        (click)="onViewClick($event)"
                    ></button>
                </div>
            </div>
            
            <!-- Book Info -->
            <div class="pt-3">
                <h3 class="text-sm font-semibold text-surface-900 dark:text-surface-0 mb-1 line-clamp-2" [title]="book.title">
                    {{ book.title }}
                </h3>
                <p class="text-xs text-surface-600 dark:text-surface-400 mb-2" *ngIf="book.author">
                    {{ book.author }}
                </p>
                <div class="flex items-center justify-between">
                    <span class="text-xs text-surface-500 dark:text-surface-400">
                        {{ book.quoteCount }} {{ book.quoteCount === 1 ? 'quote' : 'quotes' }}
                    </span>
                    <button 
                        pButton 
                        pRipple 
                        icon="pi pi-heart" 
                        class="p-button-text p-button-sm text-surface-400 hover:text-red-500"
                        (click)="onFavoriteClick($event)"
                    ></button>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .book-card {
            transition: transform 0.2s ease-in-out;
        }
        
        .book-card:hover {
            transform: translateY(-2px);
        }
        
        .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        
        .aspect-[2/3] {
            aspect-ratio: 2/3;
        }
    `]
})
export class BookCard {
    @Input() book!: Book;
    @Input() size: 'small' | 'medium' | 'large' = 'medium';
    @Output() bookClick = new EventEmitter<Book>();
    @Output() viewClick = new EventEmitter<Book>();
    @Output() favoriteClick = new EventEmitter<Book>();

    defaultCoverUrl = '/demo/images/ecommerce/blue-book.jpg';

    onBookClick() {
        this.bookClick.emit(this.book);
    }

    onViewClick(event: Event) {
        event.stopPropagation();
        this.viewClick.emit(this.book);
    }

    onFavoriteClick(event: Event) {
        event.stopPropagation();
        this.favoriteClick.emit(this.book);
    }

    onImageError(event: any) {
        event.target.src = this.defaultCoverUrl;
    }
}
