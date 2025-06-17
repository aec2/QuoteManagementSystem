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
  quotes: any[] = [];
  loading = true;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    // Simulate fetching data
    setTimeout(() => {
      this.quotes = [
        {
          userName: 'Cyber Reader',
          userNickname: '@cyber_reads',
          userAvatar: 'https://i.pravatar.cc/150?u=cyber_reads',
          quoteText: 'The sky above the port was the color of television, tuned to a dead channel.',
          author: 'William Gibson',
          bookName: 'Neuromancer'
        },
        {
          userName: 'Synth Scribe',
          userNickname: '@synth_scribe',
          userAvatar: 'https://i.pravatar.cc/150?u=synth_scribe',
          quoteText: 'All those moments will be lost in time, like tears in rain.',
          author: 'Roy Batty',
          bookName: 'Blade Runner (Do Androids Dream of Electric Sheep?)'
        },
        {
          userName: 'Tech Thinker',
          userNickname: '@tech_thinker',
          userAvatar: 'https://i.pravatar.cc/150?u=tech_thinker',
          quoteText: 'I\'m sorry, Dave. I\'m afraid I can\'t do that.',
          author: 'HAL 9000',
          bookName: '2001: A Space Odyssey'
        }
      ];
      this.loading = false;
    }, 2000);
  }

  copyQuote(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Quote copied to clipboard!' });
    });
  }
}