import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
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
    try {
      const { pagination, sort } = options || {};
      
      // Configurar paginação
      const page = pagination?.page || 1;
      const limit = pagination?.limit || 10;
      const skip = (page - 1) * limit;
      
      // Configurar ordenação
      const order: any = {};
      if (sort) {
        // Validar se o campo de ordenação é válido
        const validSortFields = ['name', 'price', 'description', 'stockQuantity'];
        if (validSortFields.includes(sort.field)) {
          order[sort.field] = sort.direction.toUpperCase();
        }
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
    } catch (error) {
      throw new InternalServerErrorException('Erro interno do servidor ao buscar produtos');
    }
  }

  async findById(id: string) {
    try {
      const product = await this.repo.findOneBy({ id });
      if (!product) {
        throw new NotFoundException(`Produto com ID ${id} não encontrado`);
      }
      return product;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro interno do servidor ao buscar produto');
    }
  }

  async search(term: string) {
    try {
      const products = await this.repo.find({ where: { name: Like(`%${term}%`) } });
      if (!products || products.length === 0) {
        throw new NotFoundException(`Nenhum produto encontrado com o termo "${term}"`);
      }
      return products;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro interno do servidor ao pesquisar produtos');
    }
  }
}
