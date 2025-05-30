export interface Quote {
  id: string;
  text: string;
  authorId: string;
  authorName: string;
  bookId: string;
  bookTitle: string;
  pageNumber?: number;
  dateAdded: Date;
  dateModified?: Date;
}

export interface CreateQuoteRequest {
  text: string;
  authorId?: string;
  authorName?: string;
  bookId?: string;
  bookTitle?: string;
  isbn?: string;
  pageNumber?: number;
}

export interface UpdateQuoteRequest {
  text: string;
  pageNumber?: number;
}