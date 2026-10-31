export interface ApiResponse<T> {
  data: T;
  meta: ResponseMeta;
}

interface ResponseMeta {
  name: string;
  description: string;
  website: string;
  location: string;
  email: string;
}

export interface PaginatedResponse<T> {
  items: T;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  hasMore: boolean;
}
