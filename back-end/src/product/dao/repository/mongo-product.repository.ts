import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoProduct, ProductDocument } from '../entity/mongo-product.entity';
import { IProductRepository, FindAllOptions, PaginationOptions, SortOptions } from '../interface/product.repository';

@Injectable()
export class MongoProductRepository implements IProductRepository {
  constructor(
    @InjectModel(MongoProduct.name) private productModel: Model<ProductDocument>,
  ) {}

  async findAll(options?: FindAllOptions) {
    const { pagination, sort } = options || {};
    
    // Configurar paginação
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const skip = (page - 1) * limit;
    
    // Configurar ordenação
    const sortObj: any = {};
    if (sort) {
      sortObj[sort.field] = sort.direction === 'asc' ? 1 : -1;
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
  }

  async findById(id: string) {
    return this.productModel.findById(id).exec();
  }

  async search(term: string) {
    return this.productModel.find({ name: { $regex: term, $options: 'i' } }).exec();
  }
}
