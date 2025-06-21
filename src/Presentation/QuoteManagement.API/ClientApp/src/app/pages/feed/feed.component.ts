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
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';



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
    IconFieldModule,
    InputIconModule,
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
  shareText: string;
  quotes: Quote[] = [];
  filteredQuotes: Quote[] = [];
  loading = true;
  expandedQuotes: { [key: number]: boolean } = {};
  readonly CHARACTER_LIMIT = 250;

  // Search and Filter
  searchQuery = '';
  activeFilter = 'all';

  // Book Search Modal
  showBookSearchModal = false;
  bookSearchQuery = '';
  searchResults: Book[] = [];
  searchingBooks = false;
  selectedBook: Book | null = null;
  allBooks: Book[] = [];
  openMenus = new Set<number>();

  constructor(
    private messageService: MessageService,
    private router: Router
  ) {
    this.shareText = 'Default share text';
  }

  ngOnInit() {
    this.loadMockData();
    this.loadMockBooks();
  }

  private loadMockData() {
    // Simulate API call with real data from JSON
    setTimeout(() => {
      // Use real quotes from the provided JSON data
      const realQuotes = [
        {
          id: 1,
          userName: 'Canzâde Abdullah Efendi',
          userNickname: '@nakkalAmca',
          userAvatar: 'https://1k-cdn.com/resimler/uyeler/68599_1748522060_4IwFt.png',
          quoteText:
            'Türk-Arap münasebetleri üzerine, bu münasebetlerin en gergin olduğu bir zamanda -bir Müslüman hissiyatıyla- imal-i fikr eden değerli mütefekkir Prof. Halil Hâlid, bu husustaki eserini şu cümlelerle bitirmektedir: "Ey Araplar ve Türkler! Sizi şaşırtmaya, sersem etmeye ve birbirinizle uğraştırmaya çalışanlardan sakınınız. Bilgisizlikten doğan kötü zanları artık bırakınız."',
          author: 'Kadir Mısıroğlu',
          bookName: "Filistin Dramı'nın Düşündürdükleri",
          comments: [],
          bookCoverUrl: 'https://1k-cdn.com/resimler/kitaplar/1654598_1734055480_pL4tu.jpg',
          genre: 'Tarih',
          datePosted: new Date(2025, 5, 14, 12, 9),
          likes: 4,
          isLiked: false,
          isBookmarked: true
        },
        {
          id: 2,
          userName: 'Taha Kılınç',
          userNickname: '@tahaklinc',
          userAvatar: 'https://1k-cdn.com/resimler/yazarlar/56586_1698730132_Ce92Y.jpg',
          quoteText:
            'Halil İnalcık Hoca aktarıyor: "Hükümdarın gücü askeri güce, askeri güç hazineye, hazine reâyanın ödediği vergilere, vergilerin artışı da adalete bağlıdır. Bu nedenle akıllı hükümdar, kendi egemenliğini korumak ve gücünü arttırmak istiyorsa, reâyaya adaletle muamele etmeli, zulümden kaçmalıdır."',
          author: 'Taha Kılınç',
          bookName: 'Dalları Gökte Bir Ağaç',
          comments: [],
          bookCoverUrl: 'https://1k-cdn.com/resimler/kitaplar/568685_86231_1607443593.jpg',
          genre: 'Tarih',
          datePosted: new Date(2025, 5, 4, 21, 57),
          likes: 4,
          isLiked: true,
          isBookmarked: false
        },
        {
          id: 3,
          userName: 'Mark Seemann',
          userNickname: '@markseemann',
          userAvatar: 'https://1k-cdn.com/resimler/yazarlar/81224_1741583284_Rxj1i.jpeg',
          quoteText: "Constructor Injection is the act of statically defining the list of required Dependencies by specifying them as parameters to the class's constructor.",
          author: 'Mark Seemann',
          bookName: 'Dependency Injection',
          comments: [],
          bookCoverUrl: 'https://1k-cdn.com/resimler/kitaplar/81224_1741583555_g0Aj3.jpeg',
          genre: 'Yazılım',
          datePosted: new Date(2025, 3, 27, 16, 50),
          likes: 2,
          isLiked: false,
          isBookmarked: true
        },
        {
          id: 4,
          userName: 'Ali ibn Abi Talib',
          userNickname: '@alira',
          userAvatar: 'https://i.pravatar.cc/150?u=ali',
          quoteText: '[Yaptığınız] amelin azlığını dert edinmeyin. Kabulünü [kabul edilip edilmeyeceğini] dert edinin.',
          author: 'Hz. Ali',
          bookName: 'Nehcül Belağa',
          comments: [],
          bookCoverUrl: '/demo/images/ecommerce/blue-book.jpg',
          genre: 'İslami Edebiyat',
          datePosted: new Date(2025, 0, 13, 9, 47),
          likes: 156,
          isLiked: true,
          isBookmarked: true
        },
        {
          id: 5,
          userName: 'İslam Bilgini',
          userNickname: '@islamibilgini',
          userAvatar: 'https://i.pravatar.cc/150?u=islam',
          quoteText:
            'Eğer insanlar bizi seviyorsa bu durum bizim faziletimizden ziyade Allah\'ın, insanların gözünde değerimizi düşürecek kusurlarımızı örtmesindendir. "Eğer üstünüzde Allah\'ın lütuf ve merhameti olmasaydı, içinizden hiçbir kimse asla temize çıkamazdı." (Nur 21)',
          author: 'İslami Kaynak',
          bookName: "Kur'an-ı Kerim",
          comments: [],
          bookCoverUrl: '/demo/images/ecommerce/blue-book.jpg',
          genre: 'Din',
          datePosted: new Date(2024, 11, 7, 1, 46),
          likes: 92,
          isLiked: false,
          isBookmarked: false
        },
        {
          id: 6,
          userName: 'Scott Wlaschin',
          userNickname: '@scottwlaschin',
          userAvatar: 'https://i.pravatar.cc/150?u=scott',
          quoteText:
            "As a developer, you may think that your job is to write code. I disagree. A developer's job is to solve a problem through software, and coding is just one aspect of software development. Good design and communication are just as important, if not more so.",
          author: 'Scott Wlaschin',
          bookName: 'Domain Modeling Made Functional',
          comments: [],
          bookCoverUrl: '/demo/images/ecommerce/blue-book.jpg',
          genre: 'Yazılım',
          datePosted: new Date(2024, 1, 10, 14, 26),
          likes: 178,
          isLiked: true,
          isBookmarked: true
        },
        {
          id: 7,
          userName: 'Mesut Özbilir',
          userNickname: '@mesutozbilir',
          userAvatar: 'https://i.pravatar.cc/150?u=mesut',
          quoteText:
            '"Evlilik=Mutluluk" gibi gerçekliği olmayan bir denklem kurulması, buradan hareketle evlenilmesi ve umulanın bulunamaması. Hâlbuki evlilik mutlu bir hayat vermez, sâdece "mutlu anlar" verebilir. O anlar ise bedel olarak ağır sorumluluklar ve fedakarlıklar ister.',
          author: 'Mesut Özbilir',
          bookName: 'Hayat Dersleri',
          comments: [],
          bookCoverUrl: '/demo/images/ecommerce/blue-book.jpg',
          genre: 'Yaşam',
          datePosted: new Date(2024, 6, 1, 22, 50),
          likes: 245,
          isLiked: false,
          isBookmarked: true
        },
        {
          id: 8,
          userName: 'Cemil Meriç',
          userNickname: '@cemilmeric',
          userAvatar: 'https://i.pravatar.cc/150?u=cemil',
          quoteText: 'Çocuk telkin ile değil temsil ile yetişir.',
          author: 'Cemil Meriç',
          bookName: 'Bu Ülke',
          comments: [],
          bookCoverUrl: '/demo/images/ecommerce/blue-book.jpg',
          genre: 'Edebiyat',
          datePosted: new Date(2025, 2, 6, 6, 35),
          likes: 334,
          isLiked: true,
          isBookmarked: false
        },
        {
          id: 9,
          userName: 'Necip Fazıl Kısakürek',
          userNickname: '@necipfazil',
          userAvatar: 'https://i.pravatar.cc/150?u=necip',
          quoteText: 'Dergiler hür tefekkürün kalesidir.',
          author: 'Necip Fazıl Kısakürek',
          bookName: 'İdeolocya Örgüsü',
          comments: [],
          bookCoverUrl: '/demo/images/ecommerce/blue-book.jpg',
          genre: 'Edebiyat',
          datePosted: new Date(2025, 2, 6, 6, 38),
          likes: 187,
          isLiked: false,
          isBookmarked: true
        },
        {
          id: 10,
          userName: 'Osman Nuri Topbaş',
          userNickname: '@osmantopbas',
          userAvatar: 'https://i.pravatar.cc/150?u=osman',
          quoteText: 'Şu yaşadığımız hayat içerisinde ilkbahar her sene tekrar gelir ama ömrün ilk baharı bir kere gelir, o da gençliktir. Gençliğinizi ümmete ve İslâma hizmetle geçirin.',
          author: 'Osman Nûri TOPBAŞ',
          bookName: 'Gönül Tahtının Sultanı',
          comments: [],
          bookCoverUrl: '/demo/images/ecommerce/blue-book.jpg',
          genre: 'Tasavvuf',
          datePosted: new Date(2025, 0, 21, 16, 27),
          likes: 412,
          isLiked: true,
          isBookmarked: true
        },
        {
          id: 11,
          userName: 'İmam Gazali',
          userNickname: '@gazali',
          userAvatar: 'https://i.pravatar.cc/150?u=gazali',
          quoteText: 'Şüpheler gerçeğe götürür. Şüphe etmeyen araştırmaz, araştırmayan görmez, görmeyen [hakka] kör kalır.',
          author: 'Gazâlî',
          bookName: "Mizânü'l-Amel",
          comments: [],
          bookCoverUrl: '/demo/images/ecommerce/blue-book.jpg',
          genre: 'Felsefe',
          datePosted: new Date(2024, 3, 30, 6, 17),
          likes: 198,
          isLiked: false,
          isBookmarked: false
        },
        {
          id: 12,
          userName: 'Kadir Mısıroğlu',
          userNickname: '@kadirmisiroglu',
          userAvatar: 'https://1k-cdn.com/resimler/yazarlar/Kadir-Misiroglu_2356_1407334536.jpg',
          quoteText: 'Kuru kavgaları bırakın kimse ile polemiğe girmeyin. Kendinizi yetiştirin, mütemadiyen okuyun, tefekkür ve tahassüs edin. Geleceğe hazırlanın.',
          author: 'Kadir Mısıroğlu',
          bookName: 'Türk-İslam Mücadelesi',
          comments: [],
          bookCoverUrl: '/demo/images/ecommerce/blue-book.jpg',
          genre: 'Tarih',
          datePosted: new Date(2024, 7, 17, 2, 22),
          likes: 76,
          isLiked: true,
          isBookmarked: false
        },
        {
          id: 13,
          userName: 'Andriy Burkov',
          userNickname: '@andriyburkov',
          userAvatar: 'https://i.pravatar.cc/150?u=andriy',
          quoteText: 'Language models are, at their core, just mathematical functions.',
          author: 'Andriy Burkov',
          bookName: 'The Hundred-Page Machine Learning Book',
          comments: [],
          bookCoverUrl: '/demo/images/ecommerce/blue-book.jpg',
          genre: 'Yapay Zeka',
          datePosted: new Date(2025, 1, 2, 1, 8),
          likes: 267,
          isLiked: false,
          isBookmarked: true
        },
        {
          id: 14,
          userName: 'Vladimir Khorikov',
          userNickname: '@vkhorikov',
          userAvatar: 'https://i.pravatar.cc/150?u=vladimir',
          quoteText:
            "We programmers all like to work on greenfield projects, those that we build from the ground up ourselves. However, you are most likely working on a legacy project right now or will be at some point in the future. There is no way around it. Each greenfield project becomes someone else's legacy code base someday.",
          author: 'Vladimir Khorikov',
          bookName: 'Unit Testing Principles, Practices, and Patterns',
          comments: [],
          bookCoverUrl: '/demo/images/ecommerce/blue-book.jpg',
          genre: 'Yazılım',
          datePosted: new Date(2024, 4, 9, 11, 41),
          likes: 145,
          isLiked: true,
          isBookmarked: false
        },
        {
          id: 15,
          userName: 'Steve Smith',
          userNickname: '@stevesmith',
          userAvatar: 'https://i.pravatar.cc/150?u=steve',
          quoteText: 'As software developers you fail in two ways: we build the thing wrong, or we build the wrong thing.',
          author: 'Steve Smith',
          bookName: 'Clean Architecture',
          comments: [],
          bookCoverUrl: '/demo/images/ecommerce/blue-book.jpg',
          genre: 'Yazılım',
          datePosted: new Date(2024, 3, 14, 11, 54),
          likes: 298,
          isLiked: false,
          isBookmarked: true
        }
      ];
      this.quotes = realQuotes;
      this.filteredQuotes = realQuotes;
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
    if (navigator.share) {
      navigator
        .share({
          title: `Quote from ${quote.bookName}`,
          text: `"${quote.quoteText}" - ${quote.author}, ${quote.bookName}`,
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
          this.fallbackShare(this.shareText);
        });
    } else {
      this.fallbackShare(this.shareText);
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
    console.log('🚀 ~ FeedComponent ~ selectBookAndProceed ~ book:', book);
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

  filterQuotes() {
    let filtered = this.quotes;

    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter((quote) => quote.quoteText.toLowerCase().includes(query) || quote.author.toLowerCase().includes(query) || quote.bookName.toLowerCase().includes(query) || quote.userName.toLowerCase().includes(query));
    }

    // Apply category filter
    if (this.activeFilter === 'sourced') {
      filtered = filtered.filter((quote) => quote.author && quote.bookName);
    } else if (this.activeFilter === 'personal') {
      filtered = filtered.filter((quote) => !quote.author || !quote.bookName);
    }

    this.filteredQuotes = filtered;
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
    this.filterQuotes();
  }

  // Menu management methods
  toggleQuoteMenu(quoteId: number) {
    if (this.openMenus.has(quoteId)) {
      this.openMenus.delete(quoteId);
    } else {
      // Close all other menus and open this one
      this.openMenus.clear();
      this.openMenus.add(quoteId);
    }
  }

  isQuoteMenuOpen(quoteId: number): boolean {
    return this.openMenus.has(quoteId);
  }

  // Quote action methods
  editQuote(quote: Quote) {
    this.openMenus.clear();
    // Navigate to edit page or open edit modal
    this.messageService.add({
      severity: 'info',
      summary: 'Edit Quote',
      detail: 'Edit functionality to be implemented'
    });
  }

  deleteQuote(quoteId: number) {
    this.openMenus.clear();
    // Show confirmation dialog and delete
    this.messageService.add({
      severity: 'warn',
      summary: 'Delete Quote',
      detail: 'Delete functionality to be implemented'
    });
  }

  shareQuoteFromMenu(quote: Quote) {
    this.openMenus.clear();
    this.shareQuote(quote);
  }
}
