import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDto {
  @ApiProperty({
    description: 'ID único do produto',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid'
  })
  id: string;

  @ApiProperty({
    description: 'Nome do produto',
    example: 'Notebook Dell Inspiron 15'
  })
  name: string;

  @ApiProperty({
    description: 'Descrição detalhada do produto',
    example: 'Notebook Dell Inspiron 15 com processador Intel i7, 16GB RAM, SSD 512GB'
  })
  description: string;

  @ApiProperty({
    description: 'Preço do produto em reais',
    example: 2999.99,
    type: 'number',
    format: 'float'
  })
  price: number;

  @ApiProperty({
    description: 'Quantidade disponível em estoque',
    example: 25,
    minimum: 0
  })
  stockQuantity: number;

  @ApiProperty({
    description: 'URL da imagem do produto',
    example: 'https://example.com/images/notebook-dell-inspiron-15.jpg',
    required: false
  })
  imageUrl?: string;
}

export class PaginatedProductsResponseDto {
  @ApiProperty({
    description: 'Lista de produtos',
    type: [ProductResponseDto]
  })
  data: ProductResponseDto[];

  @ApiProperty({
    description: 'Total de produtos disponíveis',
    example: 150
  })
  total: number;

  @ApiProperty({
    description: 'Página atual',
    example: 1
  })
  page: number;

  @ApiProperty({
    description: 'Quantidade de itens por página',
    example: 10
  })
  limit: number;
}
