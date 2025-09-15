import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { ProductService } from './product.service';
import { MySqlProductRepository } from './dao/repository/mysql-product.repository';
import { MongoProductRepository } from './dao/repository/mongo-product.repository';
import { IProductRepository } from './dao/interface/product.repository';
import { MySqlProduct } from './dao/entity/mysql-product.entity';
import { MongoProduct, ProductSchema } from './dao/entity/mongo-product.entity';

export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY';

@Module({})
export class ProductModule {
  static forRoot(): DynamicModule {
    return {
      module: ProductModule,
      imports: [
        // Configuração condicional baseada na variável DB_TYPE
        ...(process.env.DB_TYPE === 'mongo' 
          ? [MongooseModule.forFeature([{ name: MongoProduct.name, schema: ProductSchema }])]
          : [TypeOrmModule.forFeature([MySqlProduct])]
        ),
      ],
      providers: [
        ProductService,
        // Configuração condicional dos repositórios
        ...(process.env.DB_TYPE === 'mongo'
          ? [
              MongoProductRepository,
              { provide: PRODUCT_REPOSITORY, useExisting: MongoProductRepository as unknown as IProductRepository },
            ]
          : [
              MySqlProductRepository,
              { provide: PRODUCT_REPOSITORY, useExisting: MySqlProductRepository as unknown as IProductRepository },
            ]
        ),
      ],
      exports: [PRODUCT_REPOSITORY, ProductService],
    };
  }
}
