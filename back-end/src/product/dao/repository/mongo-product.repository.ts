import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MongoProduct, ProductDocument } from '../entity/mongo-product.entity';
import { IProductRepository, FindAllOptions, PaginationOptions, SortOptions } from '../interface/product.repository';

@Injectable()
export class MongoProductRepository implements IProductRepository {
  constructor(
    @InjectModel(MongoProduct.name) private productModel: Model<ProductDocument>,
  ) {}

  async findAll(options?: FindAllOptions) {
    try {
      const { pagination, sort } = options || {};
      
      // Configurar paginação
      const page = pagination?.page || 1;
      const limit = pagination?.limit || 10;
      const skip = (page - 1) * limit;
      
      // Configurar ordenação
      const sortObj: any = {};
      if (sort) {
        // Validar se o campo de ordenação é válido
        const validSortFields = ['name', 'price', 'description', 'quantidade_em_stock', 'imageUrl'];
        if (validSortFields.includes(sort.field)) {
          sortObj[sort.field] = sort.direction === 'asc' ? 1 : -1;
        }
      }
      
      // Executar consulta com paginação e ordenação
      const [data, total] = await Promise.all([
        this.productModel
          .find()
          .sort(sortObj)
          .skip(skip)
          .limit(limit)
          .exec(),
        this.productModel.countDocuments().exec()
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
      // Validar se o ID é um ObjectId válido
      if (!Types.ObjectId.isValid(id)) {
        throw new NotFoundException(`Produto com ID ${id} não encontrado`);
      }

      const product = await this.productModel.findById(id).exec();
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
      const products = await this.productModel.find({ nome: { $regex: term, $options: 'i' } }).exec();
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
