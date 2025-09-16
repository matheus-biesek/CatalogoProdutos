import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import type { IProductRepository, FindAllOptions, PaginationOptions, SortOptions } from './dao/interface/product.repository';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY') private readonly productRepository: IProductRepository,
  ) {}

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

  async search(term: string) {
    if (!term || term.trim().length < 2) {
      throw new BadRequestException('Termo de busca deve ter pelo menos 2 caracteres');
    }
    
    return await this.productRepository.search(term.trim());
  }

  async findById(id: string) {
    return await this.productRepository.findById(id);
  }
}
