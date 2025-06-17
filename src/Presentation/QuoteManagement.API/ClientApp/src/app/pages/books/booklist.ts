
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';

interface Book {
    id: string;
    title: string;
    isbn: string;
    coverImageUrl: string;
    quoteCount: number;
}

@Component({
    selector: 'app-book-list',
    standalone: true,
    imports: [CommonModule, ButtonModule, CardModule, InputTextModule, RippleModule],
    template: `
        <div class="card">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-surface-900 dark:text-surface-0">Book Collection</h2>
                <button pButton pRipple label="Add Book" icon="pi pi-plus" class="p-button-primary"></button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div *ngFor="let book of books" class="book-card">
                    <div class="relative group cursor-pointer">
                        <div class="aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
                            <img 
                                [src]="book.coverImageUrl || '/demo/images/ecommerce/blue-book.jpg'" 
                                [alt]="book.title"
                                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                (error)="onImageError($event)"
                            />
                        </div>
                        <div class="mt-4">
                            <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0 mb-2 line-clamp-2">
                                {{ book.title }}
                            </h3>
                            <p class="text-surface-600 dark:text-surface-400 text-sm mb-2" *ngIf="book.isbn">
                                ISBN: {{ book.isbn }}
                            </p>
                            <div class="flex items-center justify-between">
                                <span class="text-surface-700 dark:text-surface-300 text-sm">
                                    {{ book.quoteCount }} {{ book.quoteCount === 1 ? 'quote' : 'quotes' }}
                                </span>
                                <button 
                                    pButton 
                                    pRipple 
                                    icon="pi pi-eye" 
                                    class="p-button-text p-button-sm"
                                    [title]="'View quotes from ' + book.title"
                                ></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .book-card {
            transition: transform 0.2s ease-in-out;
        }
        
        .book-card:hover {
            transform: translateY(-4px);
        }
        
        .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        
        .aspect-[3/4] {
            aspect-ratio: 3/4;
        }
    `]
})
export class BookList implements OnInit {
    books: Book[] = [];

    ngOnInit() {
        // Sample data - replace with actual service call
        this.books = [
            {
                id: '1',
                title: 'The Great Gatsby',
                isbn: '978-0-7432-7356-5',
                coverImageUrl: '/demo/images/books/great-gatsby.jpg',
                quoteCount: 15
            },
            {
                id: '2',
                title: 'To Kill a Mockingbird',
                isbn: '978-0-06-112008-4',
                coverImageUrl: '/demo/images/books/mockingbird.jpg',
                quoteCount: 23
            },
            {
                id: '3',
                title: '1984',
                isbn: '978-0-452-28423-4',
                coverImageUrl: '/demo/images/books/1984.jpg',
                quoteCount: 31
            },
            {
                id: '4',
                title: 'Pride and Prejudice',
                isbn: '978-0-14-143951-8',
                coverImageUrl: '/demo/images/books/pride-prejudice.jpg',
                quoteCount: 18
            }
        ];
    }

    onImageError(event: any) {
        event.target.src = '/demo/images/ecommerce/blue-book.jpg';
    }
}
