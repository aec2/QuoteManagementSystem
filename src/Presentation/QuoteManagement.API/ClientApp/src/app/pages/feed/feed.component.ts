
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';

interface QuoteData {
  id: number;
  quoteText: string;
  author: string;
  bookName: string;
  user: {
    name: string;
    nickname: string;
    avatar?: string;
  };
  createdAt: Date;
  likes: number;
  isLiked: boolean;
}

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    AvatarModule,
    SkeletonModule,
    ToastModule,
    DataViewModule,
    TagModule,
    DividerModule
  ],
  providers: [MessageService],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  feedData: QuoteData[] = [];
  loading: boolean = false;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.loadFeed();
  }

  loadFeed() {
    this.loading = true;
    // Simulate API call to fetch feed data
    setTimeout(() => {
      this.feedData = [
        {
          id: 1,
          quoteText: "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
          author: "Steve Jobs",
          bookName: "Stanford Commencement Address",
          user: {
            name: "Jane Doe",
            nickname: "@janedoe_reads"
          },
          createdAt: new Date('2024-01-15'),
          likes: 42,
          isLiked: false
        },
        {
          id: 2,
          quoteText: "It is during our darkest moments that we must focus to see the light.",
          author: "Aristotle",
          bookName: "Nicomachean Ethics",
          user: {
            name: "John Smith",
            nickname: "@bookworm_john"
          },
          createdAt: new Date('2024-01-14'),
          likes: 28,
          isLiked: true
        },
        {
          id: 3,
          quoteText: "In the end, we will remember not the words of our enemies, but the silence of our friends.",
          author: "Martin Luther King Jr.",
          bookName: "The Trumpet of Conscience",
          user: {
            name: "Sarah Wilson",
            nickname: "@sarahreads"
          },
          createdAt: new Date('2024-01-13'),
          likes: 67,
          isLiked: false
        },
        {
          id: 4,
          quoteText: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
          author: "Albert Einstein",
          bookName: "The Ultimate Quotable Einstein",
          user: {
            name: "Michael Brown",
            nickname: "@physics_mike"
          },
          createdAt: new Date('2024-01-12'),
          likes: 89,
          isLiked: true
        }
      ];
      this.loading = false;
    }, 1000);
  }

  onLikeQuote(quote: QuoteData) {
    quote.isLiked = !quote.isLiked;
    quote.likes += quote.isLiked ? 1 : -1;
    
    this.messageService.add({
      severity: quote.isLiked ? 'success' : 'info',
      summary: quote.isLiked ? 'Liked!' : 'Unliked',
      detail: `Quote ${quote.isLiked ? 'added to' : 'removed from'} your favorites`,
      life: 2000
    });
  }

  onShareQuote(quote: QuoteData) {
    if (navigator.share) {
      navigator.share({
        title: `Quote by ${quote.author}`,
        text: `"${quote.quoteText}" - ${quote.author}, ${quote.bookName}`,
        url: window.location.href
      });
    } else {
      // Fallback to clipboard
      const shareText = `"${quote.quoteText}" - ${quote.author}, ${quote.bookName}`;
      navigator.clipboard.writeText(shareText).then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Copied!',
          detail: 'Quote copied to clipboard',
          life: 2000
        });
      });
    }
  }

  onCopyQuote(quote: QuoteData) {
    const quoteText = `"${quote.quoteText}" - ${quote.author}`;
    navigator.clipboard.writeText(quoteText).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Copied!',
        detail: 'Quote text copied to clipboard',
        life: 2000
      });
    });
  }

  getRelativeTime(date: Date): string {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  }

  getAvatarColor(name: string): string {
    const colors = [
      '#6366f1', '#8b5cf6', '#ec4899', '#ef4444', 
      '#f59e0b', '#10b981', '#06b6d4', '#84cc16'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  }
}
