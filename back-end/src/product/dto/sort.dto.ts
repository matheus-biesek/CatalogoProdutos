import { IsOptional, IsString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SortDto {
  @ApiProperty({
    description: 'Campo para ordenação dos produtos',
    example: 'name',
    enum: ['name', 'price', 'description', 'stockQuantity'],
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Campo de ordenação deve ser uma string' })
  @IsIn(['name', 'price', 'description', 'stockQuantity'], { 
    message: 'Campo de ordenação deve ser: name, price, description ou stockQuantity' 
  })
  sortField?: string;

  @ApiProperty({
    description: 'Direção da ordenação',
    example: 'asc',
    enum: ['asc', 'desc'],
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Direção de ordenação deve ser uma string' })
  @IsIn(['asc', 'desc'], { 
    message: 'Direção de ordenação deve ser: asc ou desc' 
  })
  sortDirection?: 'asc' | 'desc';
}
