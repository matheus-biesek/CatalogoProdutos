import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { MySqlProduct } from './product/dao/entity/mysql-product.entity';

@Module({})
export class AppModule {
  static forRoot(): DynamicModule {
    return {
      module: AppModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env',
        }),
        // Configuração condicional baseada na variável DB_TYPE
        ...(process.env.DB_TYPE === 'mongo' 
          ? [
              MongooseModule.forRootAsync({
                imports: [ConfigModule],
                useFactory: (configService: ConfigService) => ({
                  uri: `mongodb://${configService.get('MONGO_USERNAME', 'admin')}:${configService.get('MONGO_PASSWORD', 'adminpass')}@${configService.get('MONGO_HOST', 'localhost')}:${configService.get('MONGO_PORT', '27017')}/${configService.get('MONGO_DB', 'loja')}?authSource=admin`,
                }),
                inject: [ConfigService],
              }),
            ]
          : [
              TypeOrmModule.forRootAsync({
                imports: [ConfigModule],
                useFactory: (configService: ConfigService) => ({
                  type: 'mysql',
                  host: configService.get('DB_HOST', 'localhost'),
                  port: parseInt(configService.get('DB_PORT', '3306')),
                  username: configService.get('DB_USERNAME', 'root'),
                  password: configService.get('DB_PASSWORD', ''),
                  database: configService.get('DB_NAME', 'loja'),
                  entities: [MySqlProduct],
                  synchronize: false,
                }),
                inject: [ConfigService],
              }),
            ]
        ),
        ProductModule.forRoot()
      ],
      controllers: [],
      providers: [],
    };
  }
}
