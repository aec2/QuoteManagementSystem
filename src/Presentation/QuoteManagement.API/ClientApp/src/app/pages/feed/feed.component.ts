export class FeedComponent {
  feedData: any[] = []; // Array to hold feed data
  loading: boolean = false; // Loading state for the feed

  constructor() {
    this.loadFeed();
  }

  loadFeed() {
    this.loading = true;
    // Simulate an API call to fetch feed data
    setTimeout(() => {
      this.feedData = [
        { id: 1, content: 'First feed item' },
        { id: 2, content: 'Second feed item' },
        { id: 3, content: 'Third feed item' },
      ];
      this.loading = false;
    }, 1000);
  }

  handleUserInteraction(itemId: number) {
    // Handle user interaction with a feed item
    console.log(`User interacted with item: ${itemId}`);
  }
}