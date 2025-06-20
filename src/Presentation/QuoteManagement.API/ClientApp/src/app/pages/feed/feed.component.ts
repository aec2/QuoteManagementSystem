import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FluidModule } from 'primeng/fluid';

interface Quote {
  id: number;
  userName: string;
  userNickname: string;
  userAvatar: string;
  quoteText: string;
  author: string;
  bookName: string;
  comments: string[];
  bookCoverUrl?: string;
  genre?: string;
  datePosted: Date;
  likes: number;
  isLiked: boolean;
  isBookmarked: boolean;
}

interface Book {
  id: string;
  title: string;
  author?: string;
  isbn?: string;
  coverImageUrl?: string;
  quoteCount: number;
}

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    AvatarModule,
    SkeletonModule,
    ToastModule,
    DataViewModule,
    TagModule,
    DividerModule,
    TooltipModule,
    DialogModule,
    InputTextModule,
    ProgressSpinnerModule,
    InputGroupModule,
    InputGroupAddonModule,
    FluidModule
  ],
  providers: [MessageService],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  quotes: Quote[] = [];
  loading = true;
  expandedQuotes: { [key: number]: boolean } = {};
  readonly CHARACTER_LIMIT = 250;

  // Book Search Modal
  showBookSearchModal = false;
  bookSearchQuery = '';
  searchResults: Book[] = [];
  searchingBooks = false;
  selectedBook: Book | null = null;
  allBooks: Book[] = [];

  constructor(
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadMockData();
    this.loadMockBooks();
  }

  private loadMockData() {
    // Simulate API call
    setTimeout(() => {
      this.quotes = [
        {
          id: 1,
          userName: 'Sarah Mitchell',
          userNickname: '@bookworm_sarah',
          userAvatar: 'https://i.pravatar.cc/150?u=sarah',
          quoteText: 'It is our choices, Harry, that show what we truly are, far more than our abilities.',
          author: 'J.K. Rowling',
          bookName: 'Harry Potter and the Chamber of Secrets',
          comments: [],
          bookCoverUrl: '/demo/images/ecommerce/blue-book.jpg',
          genre: 'Fantasy',
          datePosted: new Date(2024, 5, 15, 10, 30),
          likes: 127,
          isLiked: false,
          isBookmarked: true
        },
        {
          id: 2,
          userName: 'Alex Chen',
          userNickname: '@scifi_reader',
          userAvatar: 'https://i.pravatar.cc/150?u=alex',
          quoteText: 'The sky above the port was the color of television, tuned to a dead channel.',
          author: 'William Gibson',
          bookName: 'Neuromancer',
          comments: [],
          bookCoverUrl: '/demo/images/ecommerce/blue-book.jpg',
          genre: 'Cyberpunk',
          datePosted: new Date(2024, 5, 14, 16, 45),
          likes: 89,
          isLiked: true,
          isBookmarked: false
        },
        {
          id: 3,
          userName: 'Emma Rodriguez',
          userNickname: '@classic_lit',
          userAvatar: 'https://i.pravatar.cc/150?u=emma',
          quoteText:
            'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.',
          author: 'Charles Dickens',
          bookName: 'A Tale of Two Cities',
          comments: [],
          bookCoverUrl: '/demo/images/ecommerce/blue-book.jpg',
          genre: 'Classic Literature',
          datePosted: new Date(2024, 5, 13, 9, 15),
          likes: 203,
          isLiked: false,
          isBookmarked: false
        },
        {
          id: 4,
          userName: 'Michael Johnson',
          userNickname: '@philosophy_mike',
          userAvatar: 'https://i.pravatar.cc/150?u=michael',
          quoteText:
            'Man is condemned to be free; because once thrown into the world, he is responsible for everything he does. It carries the weight of the whole world on its shoulders; it is responsible for itself and for all men; and it must create the values by which it chooses to live.',
          author: 'Jean-Paul Sartre',
          bookName: 'Being and Nothingness',
          bookCoverUrl: '/demo/images/ecommerce/blue-book.jpg',
          genre: 'Philosophy',
          datePosted: new Date(2024, 5, 12, 14, 20),
          comments: [],
          likes: 156,
          isLiked: true,
          isBookmarked: true
        },
        {
          id: 5,
          userName: 'Lisa Park',
          userNickname: '@mystery_maven',
          userAvatar: 'https://i.pravatar.cc/150?u=lisa',
          quoteText: 'The truth will set you free, but first it will piss you off.',
          author: 'Gloria Steinem',
          bookName: 'My Life on the Road',
          bookCoverUrl: '/demo/images/ecommerce/blue-book.jpg',
          genre: 'Biography',
          comments: [],
          datePosted: new Date(2024, 5, 11, 11, 30),
          likes: 92,
          isLiked: false,
          isBookmarked: false
        },
        {
          id: 6,
          userName: 'David Kim',
          userNickname: '@history_buff',
          userAvatar: 'https://i.pravatar.cc/150?u=david',
          quoteText: 'Those who cannot remember the past are condemned to repeat it.',
          author: 'George Santayana',
          comments: [],
          bookName: 'The Life of Reason',
          bookCoverUrl: '/demo/images/ecommerce/blue-book.jpg',
          genre: 'Philosophy',
          datePosted: new Date(2024, 5, 10, 8, 45),
          likes: 178,
          isLiked: true,
          isBookmarked: true
        },
        {
          id: 7,
          userName: 'Sophia Williams',
          userNickname: '@romantic_reader',
          userAvatar: 'https://i.pravatar.cc/150?u=sophia',
          quoteText: 'In vain have I struggled. It will not do. My feelings will not be repressed. You must allow me to tell you how ardently I admire and love you.',
          author: 'Jane Austen',
          comments: [],
          bookName: 'Pride and Prejudice',
          bookCoverUrl: '/demo/images/ecommerce/blue-book.jpg',
          genre: 'Romance',
          datePosted: new Date(2024, 5, 9, 20, 15),
          likes: 245,
          isLiked: false,
          isBookmarked: true
        },
        {
          id: 8,
          userName: 'Robert Martinez',
          userNickname: '@dystopian_thoughts',
          userAvatar: 'https://i.pravatar.cc/150?u=robert',
          quoteText:
            'Big Brother is watching you. The Party seeks power entirely for its own sake. We are not interested in the good of others; we are interested solely in power, pure power. What we shall destroy you with is the very idea that power belongs to anyone but us.',
          author: 'George Orwell',
          comments: [],
          bookName: '1984',
          bookCoverUrl: '/demo/images/ecommerce/blue-book.jpg',
          genre: 'Dystopian Fiction',
          datePosted: new Date(2024, 5, 8, 13, 45),
          likes: 334,
          isLiked: true,
          isBookmarked: false
        },
        {
          id: 9,
          userName: 'Maya Patel',
          userNickname: '@modernist_maya',
          userAvatar: 'https://i.pravatar.cc/150?u=maya',
          quoteText: 'For most of history, Anonymous was a woman.',
          author: 'Virginia Woolf',
          comments: [],
          bookName: "A Room of One's Own",
          bookCoverUrl: '/demo/images/ecommerce/blue-book.jpg',
          genre: 'Feminist Literature',
          datePosted: new Date(2024, 5, 7, 11, 20),
          likes: 187,
          isLiked: false,
          isBookmarked: true
        },
        {
          id: 10,
          userName: 'James Thompson',
          userNickname: '@adventure_jim',
          userAvatar: 'https://i.pravatar.cc/150?u=james',
          quoteText: 'All that is gold does not glitter, not all those who wander are lost; the old that is strong does not wither, deep roots are not reached by the frost.',
          author: 'J.R.R. Tolkien',
          bookName: 'The Lord of the Rings',
          bookCoverUrl: '/demo/images/ecommerce/blue-book.jpg',
          genre: 'Fantasy',
          datePosted: new Date(2024, 5, 6, 16, 30),
          likes: 412,
          comments: [],
          isLiked: true,
          isBookmarked: true
        },
        {
          id: 11,
          userName: 'Isabella Green',
          userNickname: '@nature_lover',
          userAvatar: 'https://i.pravatar.cc/150?u=isabella',
          quoteText:
            'I went to the woods to live deliberately, to front only the essential facts of life, and see if I could not learn what it had to teach, and not, when I came to die, discover that I had not lived. I did not wish to live what was not life, living is so dear.',
          author: 'Henry David Thoreau',
          bookName: 'Walden',
          comments: [],
          bookCoverUrl: '/demo/images/ecommerce/blue-book.jpg',
          genre: 'Philosophy',
          datePosted: new Date(2024, 5, 5, 7, 45),
          likes: 198,
          isLiked: false,
          isBookmarked: false
        },
        {
          id: 12,
          userName: 'Omar Hassan',
          userNickname: '@poetic_soul',
          userAvatar: 'https://i.pravatar.cc/150?u=omar',
          quoteText: 'And all at once, summer collapsed into fall.',
          author: 'Oscar Wilde',
          bookName: 'The Picture of Dorian Gray',
          bookCoverUrl: '/demo/images/ecommerce/blue-book.jpg',
          genre: 'Gothic Fiction',
          comments: [],
          datePosted: new Date(2024, 5, 4, 19, 10),
          likes: 76,
          isLiked: true,
          isBookmarked: false
        },
        {
          id: 13,
          userName: 'Rachel Cohen',
          userNickname: '@sci_enthusiast',
          userAvatar: 'https://i.pravatar.cc/150?u=rachel',
          quoteText:
            'The universe is not only stranger than we imagine, it is stranger than we can imagine. In the depths of space and time, in the quantum realm where particles dance with probability, we find that reality itself defies our most fundamental assumptions about existence.',
          author: 'Carl Sagan',
          bookName: 'Cosmos',
          bookCoverUrl: '/demo/images/ecommerce/blue-book.jpg',
          genre: 'Science',
          datePosted: new Date(2024, 5, 3, 12, 25),
          likes: 267,
          isLiked: false,
          comments: [],
          isBookmarked: true
        },
        {
          id: 14,
          userName: 'Andre Silva',
          userNickname: '@magical_realism',
          userAvatar: 'https://i.pravatar.cc/150?u=andre',
          quoteText: 'Many years later, as he faced the firing squad, Colonel Aureliano Buendía was to remember that distant afternoon when his father took him to discover ice.',
          author: 'Gabriel García Márquez',
          bookName: 'One Hundred Years of Solitude',
          bookCoverUrl: '/demo/images/ecommerce/blue-book.jpg',
          genre: 'Magical Realism',
          datePosted: new Date(2024, 5, 2, 15, 40),
          likes: 145,
          isLiked: true,
          isBookmarked: false,
          comments: []
        },
        {
          id: 15,
          userName: 'Priya Sharma',
          userNickname: '@wisdom_seeker',
          userAvatar: 'https://i.pravatar.cc/150?u=priya',
          quoteText:
            'The only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion. Freedom is not something that anybody can be given; freedom is something people take and people are as free as they want to be.',
          author: 'James Baldwin',
          bookName: 'Nobody Knows My Name',
          bookCoverUrl: '/demo/images/ecommerce/blue-book.jpg',
          genre: 'Social Commentary',
          datePosted: new Date(2024, 5, 1, 9, 55),
          likes: 298,
          isLiked: false,
          isBookmarked: true,
          comments: []
        }
      ];
      this.loading = false;
    }, 2000);
  }

  toggleLike(index: number) {
    this.quotes[index].isLiked = !this.quotes[index].isLiked;
    this.quotes[index].likes += this.quotes[index].isLiked ? 1 : -1;

    const action = this.quotes[index].isLiked ? 'liked' : 'unliked';
    this.messageService.add({
      severity: this.quotes[index].isLiked ? 'success' : 'info',
      summary: `Quote ${action}`,
      detail: `You ${action} this quote!`,
      life: 2000
    });
  }

  toggleBookmark(index: number) {
    this.quotes[index].isBookmarked = !this.quotes[index].isBookmarked;

    const action = this.quotes[index].isBookmarked ? 'bookmarked' : 'removed bookmark from';
    this.messageService.add({
      severity: this.quotes[index].isBookmarked ? 'success' : 'info',
      summary: `Quote ${this.quotes[index].isBookmarked ? 'bookmarked' : 'unbookmarked'}`,
      detail: `You ${action} this quote!`,
      life: 2000
    });
  }

  copyQuote(text: string) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Copied!',
          detail: 'Quote copied to clipboard!',
          life: 2000
        });
      })
      .catch(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to copy quote',
          life: 3000
        });
      });
  }

  shareQuote(quote: Quote) {
    const shareText = `"${quote.quoteText}" - ${quote.author}, ${quote.bookName}`;

    if (navigator.share) {
      navigator
        .share({
          title: `Quote from ${quote.bookName}`,
          text: shareText,
          url: window.location.href
        })
        .then(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Shared!',
            detail: 'Quote shared successfully!',
            life: 2000
          });
        })
        .catch(() => {
          this.fallbackShare(shareText);
        });
    } else {
      this.fallbackShare(shareText);
    }
  }

  private fallbackShare(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.messageService.add({
        severity: 'info',
        summary: 'Ready to share!',
        detail: 'Quote copied to clipboard for sharing!',
        life: 3000
      });
    });
  }

  isQuoteLong(quoteText: string): boolean {
    return quoteText.length > this.CHARACTER_LIMIT;
  }

  getTruncatedQuote(quoteText: string): string {
    return quoteText.substring(0, this.CHARACTER_LIMIT) + '...';
  }

  getDisplayedQuoteText(quote: Quote): string {
    if (!this.isQuoteLong(quote.quoteText)) {
      return quote.quoteText;
    }

    return this.expandedQuotes[quote.id] ? quote.quoteText : this.getTruncatedQuote(quote.quoteText);
  }

  toggleQuoteExpansion(quoteId: number): void {
    this.expandedQuotes[quoteId] = !this.expandedQuotes[quoteId];
  }

  isQuoteExpanded(quoteId: number): boolean {
    return !!this.expandedQuotes[quoteId];
  }

  onBookCoverError(event: any) {
    event.target.src = '/demo/images/ecommerce/blue-book.jpg';
  }

  private loadMockBooks() {
    this.allBooks = [
      {
        id: '1',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        isbn: '9780743273565',
        coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg',
        quoteCount: 15
      },
      {
        id: '2',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        isbn: '9780061120084',
        coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg',
        quoteCount: 23
      },
      {
        id: '3',
        title: '1984',
        author: 'George Orwell',
        isbn: '9780452284234',
        coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780452284234-L.jpg',
        quoteCount: 31
      },
      {
        id: '4',
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        isbn: '9780141439518',
        coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg',
        quoteCount: 18
      },
      {
        id: '5',
        title: 'The Catcher in the Rye',
        author: 'J.D. Salinger',
        isbn: '9780316769174',
        coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780316769174-L.jpg',
        quoteCount: 12
      },
      {
        id: '6',
        title: 'Lord of the Flies',
        author: 'William Golding',
        isbn: '9780571056866',
        coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780571056866-L.jpg',
        quoteCount: 27
      },
      {
        id: '7',
        title: "Harry Potter and the Philosopher's Stone",
        author: 'J.K. Rowling',
        isbn: '9780747532699',
        coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780747532699-L.jpg',
        quoteCount: 42
      },
      {
        id: '8',
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        isbn: '9780547928227',
        coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg',
        quoteCount: 35
      },
      {
        id: '9',
        title: 'Brave New World',
        author: 'Aldous Huxley',
        isbn: '9780060850524',
        coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780060850524-L.jpg',
        quoteCount: 19
      },
      {
        id: '10',
        title: 'The Chronicles of Narnia',
        author: 'C.S. Lewis',
        isbn: '9780066238500',
        coverImageUrl: 'https://covers.openlibrary.org/b/isbn/9780066238500-L.jpg',
        quoteCount: 28
      }
    ];
  }

  searchBooks() {
    if (!this.bookSearchQuery.trim()) {
      this.searchResults = [];
      return;
    }

    this.searchingBooks = true;

    // Simulate API delay
    setTimeout(() => {
      const query = this.bookSearchQuery.toLowerCase().trim();
      this.searchResults = this.allBooks.filter((book) => book.title.toLowerCase().includes(query) || (book.author && book.author.toLowerCase().includes(query)));
      this.searchingBooks = false;
    }, 800);
  }

  async selectBookAndProceed(book: Book) {
    console.log("🚀 ~ FeedComponent ~ selectBookAndProceed ~ book:", book)
    try {
      this.selectedBook = book;
      this.showBookSearchModal = false;

      // Navigate to quote adding page with selected book data
      await this.router.navigate(['/pages/quotes/add'], {
        state: { selectedBook: book }
      });
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Navigation Error',
        detail: 'Failed to load quote adding page.',
        life: 3000
      });
    }
  }

  closeBookSearchModal() {
    this.showBookSearchModal = false;
    this.bookSearchQuery = '';
    this.searchResults = [];
    this.selectedBook = null;
    this.searchingBooks = false;
  }
}
