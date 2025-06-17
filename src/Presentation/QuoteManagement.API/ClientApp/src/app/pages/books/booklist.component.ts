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
            },
            {
                id: '5',
                title: 'The Catcher in the Rye',
                isbn: '9780316769174',
                coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780316769174-L.jpg',
                quoteCount: 12
            },
            {
                id: '6',
                title: 'Lord of the Flies',
                isbn: '9780571056866',
                coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780571056866-L.jpg',
                quoteCount: 27
            },
            {
                id: '7',
                title: 'Harry Potter and the Philosopher\'s Stone',
                isbn: '9780747532699',
                coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780747532699-L.jpg',
                quoteCount: 42
            },
            {
                id: '8',
                title: 'The Hobbit',
                isbn: '9780547928227',
                coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg',
                quoteCount: 35
            },
            {
                id: '9',
                title: 'Brave New World',
                isbn: '9780060850524',
                coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780060850524-L.jpg',
                quoteCount: 19
            },
            {
                id: '10',
                title: 'The Chronicles of Narnia',
                isbn: '9780066238500',
                coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780066238500-L.jpg',
                quoteCount: 28
            },
            {
                id: '11',
                title: 'Jane Eyre',
                isbn: '9780141441146',
                coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780141441146-L.jpg',
                quoteCount: 16
            },
            {
                id: '12',
                title: 'The Picture of Dorian Gray',
                isbn: '9780141439570',
                coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780141439570-L.jpg',
                quoteCount: 21
            },
            {
                id: '13',
                title: 'Fahrenheit 451',
                isbn: '9781451673319',
                coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9781451673319-L.jpg',
                quoteCount: 24
            },
            {
                id: '14',
                title: 'Animal Farm',
                isbn: '9780451526342',
                coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780451526342-L.jpg',
                quoteCount: 14
            },
            {
                id: '15',
                title: 'The Lord of the Rings',
                isbn: '9780544003415',
                coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780544003415-L.jpg',
                quoteCount: 58
            },
            {
                id: '16',
                title: 'Wuthering Heights',
                isbn: '9780141439556',
                coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780141439556-L.jpg',
                quoteCount: 13
            }
        ];
    }

    onImageError(event: any) {
        event.target.src = '/demo/images/ecommerce/blue-book.jpg';
    }
}
