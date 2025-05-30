export interface Author {
  id: string;
  name: string;
  quoteCount: number;
}

export interface CreateAuthorRequest {
  name: string;
}

export interface UpdateAuthorRequest {
  name: string;
}