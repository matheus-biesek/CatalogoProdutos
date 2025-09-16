import { IsOptional, IsString, IsIn } from 'class-validator';

export class SortDto {
  @IsOptional()
  @IsString({ message: 'Campo de ordenação deve ser uma string' })
  @IsIn(['name', 'price', 'description', 'stockQuantity'], { 
    message: 'Campo de ordenação deve ser: name, price, description ou stockQuantity' 
  })
  sortField?: string;

  @IsOptional()
  @IsString({ message: 'Direção de ordenação deve ser uma string' })
  @IsIn(['asc', 'desc'], { 
    message: 'Direção de ordenação deve ser: asc ou desc' 
  })
  sortDirection?: 'asc' | 'desc';
}
