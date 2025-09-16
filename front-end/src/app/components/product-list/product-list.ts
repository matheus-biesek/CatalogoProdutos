import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  searchTerm: string = '';
  searchById: string = '';
  isLoading: boolean = false;
  isSearching: boolean = false;
  isSearchingById: boolean = false;

  // Paginação
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;

  // Ordenação
  sortField: string = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Opções disponíveis
  sortOptions = [
    { value: 'name', label: 'Nome' },
    { value: 'price', label: 'Preço' },
    { value: 'description', label: 'Descrição' },
    { value: 'stockQuantity', label: 'Estoque' },
    { value: 'imageUrl', label: 'URL da Imagem' }
  ];

  itemsPerPageOptions = [2, 5, 10, 20, 50];

  private searchSubject = new Subject<string>();

  constructor(
    private productService: ProductService,
    private router: Router
  ) {
    // Debounce da busca por termo para evitar muitas requisições
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.performSearch(searchTerm);
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.findAll(
      this.currentPage,
      this.itemsPerPage,
      this.sortField,
      this.sortDirection
    ).subscribe({
      next: (response) => {
        this.products = response.data;
        this.totalItems = response.total;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar produtos:', error);
        this.isLoading = false;
      }
    });
  }

  onSearchChange(): void {
    if (this.searchTerm.trim() === '') {
      this.loadProducts();
    } else {
      this.searchSubject.next(this.searchTerm);
    }
  }

  performSearch(term: string): void {
    if (term.length < 2) return;

    this.isSearching = true;
    this.productService.search(term).subscribe({
      next: (products) => {
        this.products = products;
        this.isSearching = false;
      },
      error: (error) => {
        console.error('Erro na busca:', error);
        this.products = [];
        this.isSearching = false;
      }
    });
  }

  searchProductById(): void {
    if (!this.searchById.trim()) {
      alert('Digite um ID válido');
      return;
    }

    this.isSearchingById = true;
    this.productService.findById(this.searchById.trim()).subscribe({
      next: (product) => {
        this.products = [product];
        this.searchTerm = '';
        this.isSearchingById = false;
      },
      error: (error) => {
        console.error('Erro ao buscar produto por ID:', error);
        alert('Produto não encontrado');
        this.products = [];
        this.isSearchingById = false;
      }
    });
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.searchById = '';
    this.currentPage = 1;
    this.loadProducts();
  }

  // Métodos de paginação
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadProducts();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadProducts();
    }
  }

  changeItemsPerPage(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  // Métodos de ordenação
  changeSortField(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  changeSortDirection(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.currentPage = 1;
    this.loadProducts();
  }

  viewProduct(product: Product): void {
    this.router.navigate(['/product', product.id]);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  }

  // Helper para template
  Math = Math;

  getPageNumbers(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
}