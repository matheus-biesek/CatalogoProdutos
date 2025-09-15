import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { MySqlProduct } from '../entity/mysql-product.entity'; 
import { IProductRepository, FindAllOptions, PaginationOptions, SortOptions } from '../interface/product.repository';

@Injectable()
export class MySqlProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(MySqlProduct)
    private readonly repo: Repository<MySqlProduct>,
  ) {}

  async findAll(options?: FindAllOptions) {
    const { pagination, sort } = options || {};
    
    // Configurar paginação
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const skip = (page - 1) * limit;
    
    // Configurar ordenação
    const order: any = {};
    if (sort) {
      order[sort.field] = sort.direction.toUpperCase();
    }
    
    // Executar consulta com paginação e ordenação
    const [data, total] = await Promise.all([
      this.repo.find({
        order,
        skip,
        take: limit
      }),
      this.repo.count()
    ]);
    
    return {
      data,
      total,
      page,
      limit
    };
  }

  async findById(id: string) {
    return this.repo.findOneBy({ id });
  }

  async search(term: string) {
    return this.repo.find({ where: { name: Like(`%${term}%`) } });
  }
}
