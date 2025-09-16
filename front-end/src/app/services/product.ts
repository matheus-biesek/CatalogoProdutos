import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, PaginatedProductsResponse } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  /**
   * Busca todos os produtos com paginação e ordenação
   */
  findAll(page?: number, limit?: number, sortField?: string, sortDirection?: 'asc' | 'desc'): Observable<PaginatedProductsResponse> {
    let params = new HttpParams();
    if (page) params = params.set('page', page.toString());
    if (limit) params = params.set('limit', limit.toString());
    if (sortField) params = params.set('sortField', sortField);
    if (sortDirection) params = params.set('sortDirection', sortDirection);

    return this.http.get<PaginatedProductsResponse>(this.apiUrl, { params });
  }

  findById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  search(term: string): Observable<Product[]> {
    const params = new HttpParams().set('term', term);
    return this.http.get<Product[]>(`${this.apiUrl}/search`, { params });
  }
}