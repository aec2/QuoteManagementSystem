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
import { TooltipModule } from 'primeng/tooltip';

interface Quote {
  id: number;
  userName: string;
  userNickname: string;
  userAvatar: string;
  quoteText: string;
  author: string;
  bookName: string;
  bookCoverUrl?: string;
  genre?: string;
  datePosted: Date;
  likes: number;
  isLiked: boolean;
  isBookmarked: boolean;
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
    DividerModule,
    TooltipModule
  ],
  providers: [MessageService],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  quotes: Quote[] = [];
  loading = true;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.loadMockData();
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
          bookCoverUrl: '/demo/images/books/harry-potter.jpg',
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
          bookCoverUrl: '/demo/images/books/neuromancer.jpg',
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
          quoteText: 'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness.',
          author: 'Charles Dickens',
          bookName: 'A Tale of Two Cities',
          bookCoverUrl: '/demo/images/books/tale-two-cities.jpg',
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
          quoteText: 'Man is condemned to be free; because once thrown into the world, he is responsible for everything he does.',
          author: 'Jean-Paul Sartre',
          bookName: 'Being and Nothingness',
          bookCoverUrl: '/demo/images/books/being-nothingness.jpg',
          genre: 'Philosophy',
          datePosted: new Date(2024, 5, 12, 14, 20),
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
          bookCoverUrl: '/demo/images/books/my-life-road.jpg',
          genre: 'Biography',
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
          bookName: 'The Life of Reason',
          bookCoverUrl: '/demo/images/books/life-reason.jpg',
          genre: 'Philosophy',
          datePosted: new Date(2024, 5, 10, 8, 45),
          likes: 178,
          isLiked: true,
          isBookmarked: true
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
    navigator.clipboard.writeText(text).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Copied!',
        detail: 'Quote copied to clipboard!',
        life: 2000
      });
    }).catch(() => {
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
      navigator.share({
        title: `Quote from ${quote.bookName}`,
        text: shareText,
        url: window.location.href
      }).then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Shared!',
          detail: 'Quote shared successfully!',
          life: 2000
        });
      }).catch(() => {
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

  onImageError(event: any) {
    event.target.src = '/demo/images/ecommerce/blue-book.jpg';
  }
}