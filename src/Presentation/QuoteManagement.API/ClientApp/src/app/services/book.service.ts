import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';

export interface Book {
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
  description?: string;
  publishedYear?: number;
  genres?: string[];
  pageCount?: number;
}

export interface Quote {
  id: string;
  text: string;
  pageNumber?: number;
  categories?: string[];
  addedDate: Date;
  isFavorite?: boolean;
  likes?: number;
}

export interface BookWithQuotes extends Book {
  quotes: Quote[];
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private mockBooks: Book[] = [
    {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Classic Fiction',
      genres: ['Classic', 'Fiction', 'American Literature'],
      isbn: '9780743273565',
      coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg',
      quoteCount: 15,
      rating: 4.5,
      readingStatus: 'read',
      publishedYear: 1925,
      pageCount: 180,
      description: 'The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on prosperous Long Island and in New York City, the novel tells the story of Jay Gatsby, a mysterious millionaire who throws lavish parties in hopes of winning back his lost love, Daisy Buchanan.'
    },
    {
      id: '2',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Classic Fiction',
      genres: ['Classic', 'Fiction', 'Coming of Age'],
      isbn: '9780061120084',
      coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg',
      quoteCount: 23,
      rating: 4.7,
      readingStatus: 'read',
      publishedYear: 1960,
      pageCount: 376,
      description: 'To Kill a Mockingbird is a novel by Harper Lee published in 1960. It was immediately successful, winning the Pulitzer Prize, and has become a classic of modern American literature.'
    },
    {
      id: '3',
      title: '1984',
      author: 'George Orwell',
      genre: 'Dystopian Fiction',
      genres: ['Dystopian', 'Science Fiction', 'Political Fiction'],
      isbn: '9780452284234',
      coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780452284234-L.jpg',
      quoteCount: 31,
      rating: 4.6,
      readingStatus: 'reading',
      readingProgress: 65,
      publishedYear: 1949,
      pageCount: 328,
      description: '1984 is a dystopian social science fiction novel and cautionary tale written by English writer George Orwell. It was published on 8 June 1949 by Secker & Warburg as Orwell\'s ninth and final book completed in his lifetime.'
    },
    {
      id: '4',
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      genre: 'Romance',
      genres: ['Romance', 'Classic', 'Fiction'],
      isbn: '9780141439518',
      coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg',
      quoteCount: 18,
      rating: 4.8,
      readingStatus: 'read',
      publishedYear: 1813,
      pageCount: 432,
      description: 'Pride and Prejudice is an 1813 novel of manners by Jane Austen. The novel follows the character development of Elizabeth Bennet, the dynamic protagonist of the book who learns about the repercussions of hasty judgments.'
    },
    {
      id: '5',
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      genre: 'Coming of Age',
      genres: ['Coming of Age', 'Fiction', 'Classic'],
      isbn: '9780316769174',
      coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780316769174-L.jpg',
      quoteCount: 12,
      rating: 4.2,
      readingStatus: 'want-to-read',
      publishedYear: 1951,
      pageCount: 277,
      description: 'The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951.'
    },
    {
      id: '6',
      title: 'Lord of the Flies',
      author: 'William Golding',
      genre: 'Dystopian Fiction',
      genres: ['Dystopian', 'Fiction', 'Adventure'],
      isbn: '9780571056866',
      coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780571056866-L.jpg',
      quoteCount: 27,
      rating: 4.1,
      readingStatus: 'read',
      publishedYear: 1954,
      pageCount: 224,
      description: 'Lord of the Flies is a 1954 novel by Nobel Prize-winning British author William Golding.'
    },
    {
      id: '7',
      title: 'Harry Potter and the Philosopher\'s Stone',
      author: 'J.K. Rowling',
      genre: 'Fantasy',
      genres: ['Fantasy', 'Young Adult', 'Adventure'],
      isbn: '9780747532699',
      coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780747532699-L.jpg',
      quoteCount: 42,
      rating: 4.9,
      readingStatus: 'read',
      publishedYear: 1997,
      pageCount: 223,
      description: 'Harry Potter and the Philosopher\'s Stone is a fantasy novel written by British author J. K. Rowling.'
    },
    {
      id: '8',
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      genre: 'Fantasy',
      genres: ['Fantasy', 'Adventure', 'Classic'],
      isbn: '9780547928227',
      coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg',
      quoteCount: 35,
      rating: 4.7,
      readingStatus: 'read',
      publishedYear: 1937,
      pageCount: 366,
      description: 'The Hobbit is a children\'s fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim.'
    },
    {
      id: '9',
      title: 'Brave New World',
      author: 'Aldous Huxley',
      genre: 'Dystopian Fiction',
      genres: ['Dystopian', 'Science Fiction', 'Philosophy'],
      isbn: '9780060850524',
      coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780060850524-L.jpg',
      quoteCount: 28,
      rating: 4.3,
      readingStatus: 'reading',
      readingProgress: 45,
      publishedYear: 1932,
      pageCount: 311,
      description: 'Brave New World is a dystopian social science fiction novel by English author Aldous Huxley, written in 1931 and published in 1932.'
    },
    {
      id: '10',
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      author: 'J.R.R. Tolkien',
      genre: 'Fantasy',
      genres: ['Fantasy', 'Epic', 'Adventure'],
      isbn: '9780547928210',
      coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780547928210-L.jpg',
      quoteCount: 52,
      rating: 4.8,
      readingStatus: 'want-to-read',
      publishedYear: 1954,
      pageCount: 423,
      description: 'The Fellowship of the Ring is the first of three volumes of the epic novel The Lord of the Rings by the English author J. R. R. Tolkien.'
    },
    {
      id: '11',
      title: 'Jane Eyre',
      author: 'Charlotte Brontë',
      genre: 'Gothic Fiction',
      genres: ['Gothic', 'Romance', 'Classic'],
      isbn: '9780141441146',
      coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780141441146-L.jpg',
      quoteCount: 21,
      rating: 4.4,
      readingStatus: 'read',
      publishedYear: 1847,
      pageCount: 507,
      description: 'Jane Eyre is a novel by English writer Charlotte Brontë, published under the pen name "Currer Bell", on 16 October 1847.'
    },
    {
      id: '12',
      title: 'The Picture of Dorian Gray',
      author: 'Oscar Wilde',
      genre: 'Gothic Fiction',
      genres: ['Gothic', 'Philosophy', 'Classic'],
      isbn: '9780141439570',
      coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780141439570-L.jpg',
      quoteCount: 33,
      rating: 4.5,
      readingStatus: 'reading',
      readingProgress: 30,
      publishedYear: 1890,
      pageCount: 254,
      description: 'The Picture of Dorian Gray is a Gothic and philosophical novel by Oscar Wilde, first published complete in the July 1890 issue of Lippincott\'s Monthly Magazine.'
    },
    {
      id: '13',
      title: 'Fahrenheit 451',
      author: 'Ray Bradbury',
      genre: 'Dystopian Fiction',
      genres: ['Dystopian', 'Science Fiction', 'Censorship'],
      isbn: '9781451673319',
      coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9781451673319-L.jpg',
      quoteCount: 24,
      rating: 4.6,
      readingStatus: 'read',
      publishedYear: 1953,
      pageCount: 249,
      description: 'Fahrenheit 451 is a 1953 dystopian novel by American writer Ray Bradbury. Often regarded as one of his best works, the novel presents a future American society where books are outlawed.'
    },
    {
      id: '14',
      title: 'Wuthering Heights',
      author: 'Emily Brontë',
      genre: 'Gothic Fiction',
      genres: ['Gothic', 'Romance', 'Classic'],
      isbn: '9780141439556',
      coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780141439556-L.jpg',
      quoteCount: 19,
      rating: 4.2,
      readingStatus: 'want-to-read',
      publishedYear: 1847,
      pageCount: 416,
      description: 'Wuthering Heights is an 1847 novel by Emily Brontë, initially published under the pseudonym Ellis Bell.'
    },
    {
      id: '15',
      title: 'The Chronicles of Narnia: The Lion, the Witch and the Wardrobe',
      author: 'C.S. Lewis',
      genre: 'Fantasy',
      genres: ['Fantasy', 'Children\'s Literature', 'Adventure'],
      isbn: '9780064471046',
      coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780064471046-L.jpg',
      quoteCount: 16,
      rating: 4.7,
      readingStatus: 'read',
      publishedYear: 1950,
      pageCount: 206,
      description: 'The Lion, the Witch and the Wardrobe is a fantasy novel for children by C. S. Lewis, published by Geoffrey Bles in 1950.'
    },
    {
      id: '16',
      title: 'Of Mice and Men',
      author: 'John Steinbeck',
      genre: 'Classic Fiction',
      genres: ['Classic', 'Drama', 'American Literature'],
      isbn: '9780140177398',
      coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780140177398-L.jpg',
      quoteCount: 14,
      rating: 4.3,
      readingStatus: 'read',
      publishedYear: 1937,
      pageCount: 112,
      description: 'Of Mice and Men is a novella written by John Steinbeck. Published in 1937, it narrates the story of George Milton and Lennie Small, two displaced migrant ranch workers.'
    },
    {
      id: '17',
      title: 'Animal Farm',
      author: 'George Orwell',
      genre: 'Political Satire',
      genres: ['Political Satire', 'Allegory', 'Classic'],
      isbn: '9780451526342',
      coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780451526342-L.jpg',
      quoteCount: 22,
      rating: 4.4,
      readingStatus: 'reading',
      readingProgress: 80,
      publishedYear: 1945,
      pageCount: 112,
      description: 'Animal Farm is a beast fable, in the form of satirical allegorical novella, by George Orwell, first published in England on 17 August 1945.'
    }
  ];

  private mockQuotes: { [bookId: string]: Quote[] } = {
    '1': [
      {
        id: 'q1',
        text: 'So we beat on, boats against the current, borne back ceaselessly into the past.',
        pageNumber: 180,
        categories: ['Philosophy', 'Time'],
        addedDate: new Date('2024-01-15'),
        isFavorite: true
      },
      {
        id: 'q2',
        text: 'In his blue gardens men and girls came and went like moths among the whisperings and the champagne and the stars.',
        pageNumber: 39,
        categories: ['Description', 'Atmosphere'],
        addedDate: new Date('2024-01-10'),
        isFavorite: false
      },
      {
        id: 'q3',
        text: 'I hope she\'ll be a fool -- that\'s the best thing a girl can be in this world, a beautiful little fool.',
        pageNumber: 17,
        categories: ['Society', 'Gender'],
        addedDate: new Date('2024-01-08'),
        isFavorite: true
      }
    ],
    '2': [
      {
        id: 'q4',
        text: 'You never really understand a person until you consider things from his point of view... Until you climb inside of his skin and walk around in it.',
        pageNumber: 30,
        categories: ['Empathy', 'Understanding'],
        addedDate: new Date('2024-01-12'),
        isFavorite: true
      },
      {
        id: 'q5',
        text: 'People generally see what they look for, and hear what they listen for.',
        pageNumber: 174,
        categories: ['Perception', 'Truth'],
        addedDate: new Date('2024-01-09'),
        isFavorite: false
      }
    ],
    '3': [
      {
        id: 'q6',
        text: 'War is peace. Freedom is slavery. Ignorance is strength.',
        pageNumber: 4,
        categories: ['Politics', 'Paradox'],
        addedDate: new Date('2024-01-14'),
        isFavorite: true
      },
      {
        id: 'q7',
        text: 'Big Brother is watching you.',
        pageNumber: 2,
        categories: ['Surveillance', 'Control'],
        addedDate: new Date('2024-01-11'),
        isFavorite: true
      },
      {
        id: 'q8',
        text: 'If you want to keep a secret, you must also hide it from yourself.',
        pageNumber: 284,
        categories: ['Truth', 'Psychology'],
        addedDate: new Date('2024-01-07'),
        isFavorite: false
      }
    ],
    '4': [
      {
        id: 'q9',
        text: 'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.',
        pageNumber: 1,
        categories: ['Society', 'Marriage', 'Irony'],
        addedDate: new Date('2024-01-13'),
        isFavorite: true
      },
      {
        id: 'q10',
        text: 'I declare after all there is no enjoyment like reading! How much sooner one tires of any thing than of a book!',
        pageNumber: 37,
        categories: ['Reading', 'Literature'],
        addedDate: new Date('2024-01-06'),
        isFavorite: false
      }
    ],
    '5': [
      {
        id: 'q11',
        text: 'Don\'t ever tell anybody anything. If you do, you start missing everybody.',
        pageNumber: 214,
        categories: ['Life', 'Relationships'],
        addedDate: new Date('2024-01-05'),
        isFavorite: true
      }
    ],
    '7': [
      {
        id: 'q12',
        text: 'It does not do to dwell on dreams and forget to live.',
        pageNumber: 214,
        categories: ['Dreams', 'Life', 'Wisdom'],
        addedDate: new Date('2024-01-04'),
        isFavorite: true
      },
      {
        id: 'q13',
        text: 'Happiness can be found, even in the darkest of times, if one only remembers to turn on the light.',
        pageNumber: 322,
        categories: ['Hope', 'Happiness', 'Light'],
        addedDate: new Date('2024-01-03'),
        isFavorite: true
      }
    ]
  };

  getAllBooks(): Observable<Book[]> {
    return of(this.mockBooks).pipe(delay(1000));
  }

  getBook(id: string): Observable<BookWithQuotes> {
    return new Observable(observer => {
      setTimeout(() => {
        const book = this.mockBooks.find(b => b.id === id);
        if (!book) {
          observer.error(new Error('Book not found'));
          return;
        }

        const quotes = this.mockQuotes[id] || [];
        const bookWithQuotes: BookWithQuotes = {
          ...book,
          quotes: quotes
        };

        observer.next(bookWithQuotes);
        observer.complete();
      }, 1500); // Simulate network delay
    });
  }

  searchBooks(query: string): Observable<Book[]> {
    const filtered = this.mockBooks.filter(book =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author?.toLowerCase().includes(query.toLowerCase()) ||
      book.genre?.toLowerCase().includes(query.toLowerCase())
    );
    return of(filtered).pipe(delay(500));
  }
} 