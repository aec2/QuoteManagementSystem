import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

interface Book {
    id: string;
    title: string;
    isbn: string;
    coverImageUrl: string;
    quoteCount: number;
    rating: number;
    author?: string;
    genre?: string;
    readingStatus?: 'read' | 'reading' | 'want-to-read';
    readingProgress?: number;
}

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
        // Simulate loading
        setTimeout(() => {
            this.books = [
                {
                    id: '1',
                    title: 'The Great Gatsby',
                    author: 'F. Scott Fitzgerald',
                    genre: 'Classic Fiction',
                    isbn: '9780743273565',
                    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg',
                    quoteCount: 15,
                    rating: 4.5,
                    readingStatus: 'read'
                },
                {
                    id: '2',
                    title: 'To Kill a Mockingbird',
                    author: 'Harper Lee',
                    genre: 'Classic Fiction',
                    isbn: '9780061120084',
                    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg',
                    quoteCount: 23,
                    rating: 4.7,
                    readingStatus: 'read'
                },
                {
                    id: '3',
                    title: '1984',
                    author: 'George Orwell',
                    genre: 'Dystopian Fiction',
                    isbn: '9780452284234',
                    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780452284234-L.jpg',
                    quoteCount: 31,
                    rating: 4.6,
                    readingStatus: 'reading',
                    readingProgress: 65
                },
                {
                    id: '4',
                    title: 'Pride and Prejudice',
                    author: 'Jane Austen',
                    genre: 'Romance',
                    isbn: '9780141439518',
                    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg',
                    quoteCount: 18,
                    rating: 4.8,
                    readingStatus: 'read'
                },
                {
                    id: '5',
                    title: 'The Catcher in the Rye',
                    author: 'J.D. Salinger',
                    genre: 'Coming of Age',
                    isbn: '9780316769174',
                    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780316769174-L.jpg',
                    quoteCount: 12,
                    rating: 4.2,
                    readingStatus: 'want-to-read'
                },
                {
                    id: '6',
                    title: 'Lord of the Flies',
                    author: 'William Golding',
                    genre: 'Dystopian Fiction',
                    isbn: '9780571056866',
                    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780571056866-L.jpg',
                    quoteCount: 27,
                    rating: 4.1,
                    readingStatus: 'read'
                },
                {
                    id: '7',
                    title: 'Harry Potter and the Philosopher\'s Stone',
                    author: 'J.K. Rowling',
                    genre: 'Fantasy',
                    isbn: '9780747532699',
                    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780747532699-L.jpg',
                    quoteCount: 42,
                    rating: 4.9,
                    readingStatus: 'read'
                },
                {
                    id: '8',
                    title: 'The Hobbit',
                    author: 'J.R.R. Tolkien',
                    genre: 'Fantasy',
                    isbn: '9780547928227',
                    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg',
                    quoteCount: 35,
                    rating: 4.8,
                    readingStatus: 'read'
                },
                {
                    id: '9',
                    title: 'Brave New World',
                    author: 'Aldous Huxley',
                    genre: 'Dystopian Fiction',
                    isbn: '9780060850524',
                    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780060850524-L.jpg',
                    quoteCount: 19,
                    rating: 4.3,
                    readingStatus: 'reading',
                    readingProgress: 32
                },
                {
                    id: '10',
                    title: 'The Chronicles of Narnia',
                    author: 'C.S. Lewis',
                    genre: 'Fantasy',
                    isbn: '9780066238500',
                    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780066238500-L.jpg',
                    quoteCount: 28,
                    rating: 4.7,
                    readingStatus: 'want-to-read'
                },
                {
                    id: '11',
                    title: 'Jane Eyre',
                    author: 'Charlotte Brontë',
                    genre: 'Gothic Fiction',
                    isbn: '9780141441146',
                    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780141441146-L.jpg',
                    quoteCount: 16,
                    rating: 4.4,
                    readingStatus: 'read'
                },
                {
                    id: '12',
                    title: 'The Picture of Dorian Gray',
                    author: 'Oscar Wilde',
                    genre: 'Gothic Fiction',
                    isbn: '9780141439570',
                    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780141439570-L.jpg',
                    quoteCount: 21,
                    rating: 4.5,
                    readingStatus: 'reading',
                    readingProgress: 78
                },
                {
                    id: '13',
                    title: 'Fahrenheit 451',
                    author: 'Ray Bradbury',
                    genre: 'Dystopian Fiction',
                    isbn: '9781451673319',
                    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9781451673319-L.jpg',
                    quoteCount: 24,
                    rating: 4.6,
                    readingStatus: 'want-to-read'
                },
                {
                    id: '14',
                    title: 'Animal Farm',
                    author: 'George Orwell',
                    genre: 'Political Satire',
                    isbn: '9780451526342',
                    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780451526342-L.jpg',
                    quoteCount: 14,
                    rating: 4.4,
                    readingStatus: 'read'
                },
                {
                    id: '15',
                    title: 'The Lord of the Rings',
                    author: 'J.R.R. Tolkien',
                    genre: 'Fantasy',
                    isbn: '9780544003415',
                    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780544003415-L.jpg',
                    quoteCount: 58,
                    rating: 4.9,
                    readingStatus: 'read'
                },
                {
                    id: '16',
                    title: 'Wuthering Heights',
                    author: 'Emily Brontë',
                    genre: 'Gothic Fiction',
                    isbn: '9780141439556',
                    coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780141439556-L.jpg',
                    quoteCount: 13,
                    rating: 4.3,
                    readingStatus: 'want-to-read'
                }
            ];
            this.applyFiltersAndSort();
            this.isLoading = false;
        }, 1500);
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
                return `${baseClasses} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5`;
            case 'compact':
            default:
                return `${baseClasses} grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 2xl:grid-cols-9`;
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
        // TODO: Navigate to book details page
        console.log('View book details:', book);
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