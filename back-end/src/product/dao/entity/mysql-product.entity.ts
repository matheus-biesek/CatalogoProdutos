import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'produtos' })
export class MySqlProduct {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'nome' })
    name: string;

    @Column({ name: 'descricao', type: 'text', nullable: true })
    description?: string; // Campo opcional

    @Column({ name: 'preco', type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ name: 'url_imagem', length: 500, nullable: true })
    imageUrl?: string; // Campo opcional

    @Column({ name: 'quantidade_em_stock', type: 'int', default: 0 })
    stockQuantity: number;
}
