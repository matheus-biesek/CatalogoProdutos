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

  @Prop({ type: Number, default: 0 })
  quantidade_em_stock: number;
}

export const ProductSchema = SchemaFactory.createForClass(MongoProduct);

ProductSchema.set('toJSON', {
  transform: function(doc, ret: any) {
    ret.id = ret._id;
    ret.name = ret.nome;
    ret.description = ret.descricao || '';
    ret.price = ret.preco;
    ret.stockQuantity = ret.quantidade_em_stock;
    ret.imageUrl = ret.url_imagem;

    delete ret._id;
    delete ret.__v;
    delete ret.nome;
    delete ret.descricao;
    delete ret.preco;
    delete ret.quantidade_em_stock;
    delete ret.url_imagem;

    return ret;
  }
});
