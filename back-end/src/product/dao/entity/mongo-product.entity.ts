import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = MongoProduct & Document;

@Schema({ collection: 'produtos' })
export class MongoProduct {

  @Prop({ type: String, required: true, alias: 'nome' })
  name: string;

  @Prop({ type: String, alias: 'descricao' })
  description?: string; // Campo opcional

  @Prop({ type: Number, required: true, alias: 'preco' })
  price: number;

  @Prop({ type: String, alias: 'url_imagem' })
  imageUrl?: string; // Campo opcional

  @Prop({ type: Number, default: 0, alias: 'quantidade_em_stock' })
  stockQuantity: number;
}

export const ProductSchema = SchemaFactory.createForClass(MongoProduct);
