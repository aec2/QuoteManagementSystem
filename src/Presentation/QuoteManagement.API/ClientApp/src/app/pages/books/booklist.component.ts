import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ChipModule } from 'primeng/chip';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';
import { SkeletonModule } from 'primeng/skeleton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { PaginatorModule } from 'primeng/paginator';
import { BookService, Book } from '../../services/book.service';

interface SortOption {
    label: string;
    value: string;
}

interface DensityOption {
    label: string;
    value: string;
}

interface StatusFilter {
    label: string;
    value: string;
    count: number;
}

interface ActiveFilter {
    type: string;
    value: string;
    label: string;
}

@Component({
    selector: 'app-book-list',
    standalone: true,
    imports: [
        CommonModule,
        IconFieldModule,
        InputIconModule, 
        ButtonModule, 
        CardModule, 
        InputTextModule, 
        RippleModule, 
        RatingModule, 
        FormsModule,
        ChipModule,
        BadgeModule,
        TooltipModule,
        SkeletonModule,
        DropdownModule,
        TagModule,
        ProgressBarModule,
        PaginatorModule
    ],
    templateUrl: './booklist.component.html',
    styleUrls: ['./booklist.component.scss']
})
export class BookList implements OnInit {
    books: Book[] = [];
    searchTerm: string = '';
    filteredBooks: Book[] = [];
    isLoading: boolean = true;
    viewMode: 'grid' | 'list' = 'grid';
    
    // New properties for enhanced functionality
    selectedSort: string = 'title';
    selectedDensity: string = 'compact';
    selectedStatusFilter: string = 'all';
    currentPage: number = 1;
    pageSize: number = 12;
    activeFilters: ActiveFilter[] = [];

    constructor(
        private router: Router,
        private bookService: BookService
    ) {}
    
    // Options for dropdowns
    sortOptions: SortOption[] = [
        { label: 'Title A-Z', value: 'title' },
        { label: 'Title Z-A', value: 'title_desc' },
        { label: 'Author A-Z', value: 'author' },
        { label: 'Author Z-A', value: 'author_desc' },
        { label: 'Rating High-Low', value: 'rating_desc' },
        { label: 'Rating Low-High', value: 'rating' },
        { label: 'Recently Added', value: 'recent' },
        { label: 'Most Quotes', value: 'quotes_desc' }
    ];
    
    densityOptions: DensityOption[] = [
        { label: 'Compact', value: 'compact' },
        { label: 'Comfortable', value: 'comfortable' }
    ];

    get totalBooks(): number {
        return this.books.length;
    }

    get readBooksCount(): number {
        return this.filteredBooks.filter(b => b.readingStatus === 'read').length;
    }

    get readingStatusFilters(): StatusFilter[] {
        return [
            { 
                label: 'All', 
                value: 'all', 
                count: this.books.length 
            },
            { 
                label: 'Read', 
                value: 'read', 
                count: this.books.filter(b => b.readingStatus === 'read').length 
            },
            { 
                label: 'Reading', 
                value: 'reading', 
                count: this.books.filter(b => b.readingStatus === 'reading').length 
            },
            { 
                label: 'Want to Read', 
                value: 'want-to-read', 
                count: this.books.filter(b => b.readingStatus === 'want-to-read').length 
            }
        ];
    }

    ngOnInit() {
        this.loadBooks();
    }

    private loadBooks() {
        this.isLoading = true;
        this.bookService.getAllBooks().subscribe({
            next: (books) => {
                this.books = books;
                this.applyFiltersAndSort();
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error loading books:', err);
                this.isLoading = false;
            }
        });
    }

    onImageError(event: any) {
        event.target.src = '/demo/images/ecommerce/blue-book.jpg';
    }

    onSearchChange(search: string) {
        this.searchTerm = search;
        this.applyFiltersAndSort();
    }

    toggleViewMode() {
        this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
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
            case 'read': return 'Read';
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

    // New methods for enhanced functionality
    getGridClasses(): string {
        const baseClasses = 'grid gap-4';
        switch (this.selectedDensity) {
            case 'comfortable':
                return `${baseClasses} grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5`;
            case 'compact':
            default:
                return `${baseClasses} grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 2xl:grid-cols-9`;
        }
    }

    getCardContentClasses(): string {
        return this.selectedDensity === 'comfortable' ? 'p-6' : 'p-4';
    }

    onSortChange(event: any): void {
        this.selectedSort = event.value;
        this.applyFiltersAndSort();
    }

    onDensityChange(event: any): void {
        this.selectedDensity = event.value;
    }

    onStatusFilterChange(status: string): void {
        this.selectedStatusFilter = status;
        this.applyFiltersAndSort();
    }

    getStatusChipStyle(status: string): string {
        const baseStyle = 'cursor-pointer transition-colors';
        const isActive = this.selectedStatusFilter === status;
        
        switch (status) {
            case 'all':
                return `${baseStyle} ${isActive ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' : 'hover:bg-indigo-100 dark:hover:bg-indigo-900/30'}`;
            case 'read':
                return `${baseStyle} ${isActive ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'hover:bg-green-100 dark:hover:bg-green-900/30'}`;
            case 'reading':
                return `${baseStyle} ${isActive ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'hover:bg-blue-100 dark:hover:bg-blue-900/30'}`;
            case 'want-to-read':
                return `${baseStyle} ${isActive ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' : 'hover:bg-orange-100 dark:hover:bg-orange-900/30'}`;
            default:
                return baseStyle;
        }
    }

    hasActiveFilters(): boolean {
        return this.activeFilters.length > 0 || this.selectedStatusFilter !== 'all' || this.searchTerm.length > 0;
    }

    getActiveFilters(): ActiveFilter[] {
        const filters: ActiveFilter[] = [];
        
        if (this.selectedStatusFilter !== 'all') {
            const statusLabel = this.readingStatusFilters.find(f => f.value === this.selectedStatusFilter)?.label || this.selectedStatusFilter;
            filters.push({
                type: 'status',
                value: this.selectedStatusFilter,
                label: statusLabel
            });
        }
        
        if (this.searchTerm) {
            filters.push({
                type: 'search',
                value: this.searchTerm,
                label: `Search: "${this.searchTerm}"`
            });
        }
        
        return filters;
    }

    removeFilter(type: string, value: string): void {
        switch (type) {
            case 'status':
                this.selectedStatusFilter = 'all';
                break;
            case 'search':
                this.searchTerm = '';
                break;
        }
        this.applyFiltersAndSort();
    }

    clearAllFilters(): void {
        this.selectedStatusFilter = 'all';
        this.searchTerm = '';
        this.activeFilters = [];
        this.applyFiltersAndSort();
    }

    trackByBookId(index: number, book: Book): string {
        return book.id;
    }

    viewBookDetails(book: Book): void {
        this.router.navigate(['/books', book.id]);
    }

    editBook(book: Book): void {
        // TODO: Navigate to edit book page
        console.log('Edit book:', book);
    }

    toggleReadStatus(book: Book): void {
        if (book.readingStatus === 'read') {
            book.readingStatus = 'want-to-read';
            book.readingProgress = undefined;
        } else {
            book.readingStatus = 'read';
            book.readingProgress = 100;
        }
        this.applyFiltersAndSort();
    }

    getReadingStatusSeverity(status?: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
        switch (status) {
            case 'read': return 'success';
            case 'reading': return 'info';
            case 'want-to-read': return 'warn';
            default: return 'secondary';
        }
    }

    onPageChange(event: any): void {
        this.currentPage = Math.floor(event.first / event.rows) + 1;
        this.pageSize = event.rows;
    }

    private applyFiltersAndSort(): void {
        let filtered = [...this.books];

        // Apply search filter
        if (this.searchTerm) {
            filtered = filtered.filter(book =>
                book.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                book.author?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                book.genre?.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        }

        // Apply status filter
        if (this.selectedStatusFilter !== 'all') {
            filtered = filtered.filter(book => book.readingStatus === this.selectedStatusFilter);
        }

        // Apply sorting
        filtered.sort((a, b) => {
            switch (this.selectedSort) {
                case 'title':
                    return a.title.localeCompare(b.title);
                case 'title_desc':
                    return b.title.localeCompare(a.title);
                case 'author':
                    return (a.author || '').localeCompare(b.author || '');
                case 'author_desc':
                    return (b.author || '').localeCompare(a.author || '');
                case 'rating':
                    return a.rating - b.rating;
                case 'rating_desc':
                    return b.rating - a.rating;
                case 'quotes_desc':
                    return b.quoteCount - a.quoteCount;
                default:
                    return a.title.localeCompare(b.title);
            }
        });

        this.filteredBooks = filtered;
    }
}