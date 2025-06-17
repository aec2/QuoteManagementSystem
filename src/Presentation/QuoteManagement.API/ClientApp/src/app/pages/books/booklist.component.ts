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
    templateUrl: './booklist.component.html',
    styleUrls: ['./booklist.component.scss']
})

export class BookList implements OnInit {
    books: Book[] = [];

    ngOnInit() {
        this.books = [
            {
                id: '1',
                title: 'The Great Gatsby',
                isbn: '9780743273565',
                coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg',
                quoteCount: 15
            },
            {
                id: '2',
                title: 'To Kill a Mockingbird',
                isbn: '9780061120084',
                coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg',
                quoteCount: 23
            },
            {
                id: '3',
                title: '1984',
                isbn: '9780452284234',
                coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780452284234-L.jpg',
                quoteCount: 31
            },
            {
                id: '4',
                title: 'Pride and Prejudice',
                isbn: '9780141439518',
                coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg',
                quoteCount: 18
            }
        ];
    }

    onImageError(event: any) {
        event.target.src = '/demo/images/ecommerce/blue-book.jpg';
    }
}
