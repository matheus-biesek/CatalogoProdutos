export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

export interface FindAllOptions {
  pagination?: PaginationOptions;
  sort?: SortOptions;
}

export interface IProductRepository {
  findAll(options?: FindAllOptions): Promise<{ data: any[]; total: number; page: number; limit: number }>;
  findById(id: string): Promise<any | null>;
  search(term: string): Promise<any[]>;
}