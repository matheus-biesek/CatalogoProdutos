import { Injectable, Inject } from '@nestjs/common';
import type { IProductRepository, FindAllOptions, PaginationOptions, SortOptions } from './dao/interface/product.repository';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY') private readonly productRepository: IProductRepository,
  ) {}

  /**
   * Retorna uma lista de todos os produtos com paginação e ordenação
   * GET /api/products?page=1&limit=10&sort=price,asc
   */
  async findAll(page?: number, limit?: number, sortField?: string, sortDirection?: 'asc' | 'desc') {
    const options: FindAllOptions = {};
    
    // Configurar paginação se fornecida
    if (page && limit) {
      options.pagination = {
        page: Number(page),
        limit: Number(limit)
      };
    }
    
    // Configurar ordenação se fornecida
    if (sortField && sortDirection) {
      options.sort = {
        field: sortField,
        direction: sortDirection
      };
    }
    
    return await this.productRepository.findAll(options);
  }

  /**
   * Filtra a lista de produtos por nome que contenha o termo de busca (case-insensitive)
   * GET /api/products?search={term}
   */
  async search(term: string, page?: number, limit?: number, sortField?: string, sortDirection?: 'asc' | 'desc') {
    const options: FindAllOptions = {};
    
    // Configurar paginação se fornecida
    if (page && limit) {
      options.pagination = {
        page: Number(page),
        limit: Number(limit)
      };
    }
    
    // Configurar ordenação se fornecida
    if (sortField && sortDirection) {
      options.sort = {
        field: sortField,
        direction: sortDirection
      };
    }
    
    return await this.productRepository.search(term);
  }

  /**
   * Retorna os detalhes de um produto específico pelo seu id
   * GET /api/products/:id
   */
  async findById(id: string) {
    return await this.productRepository.findById(id);
  }
}
