export interface Book {
  id: string;
  title: string;
  isbn: string;
  quoteCount: number;
}

export interface CreateBookRequest {
  title: string;
  isbn?: string;
}

export interface UpdateBookRequest {
  title: string;
  isbn?: string;
}