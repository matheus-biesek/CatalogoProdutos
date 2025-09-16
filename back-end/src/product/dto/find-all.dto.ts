import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from './pagination.dto';
import { SortDto } from './sort.dto';

export class FindAllDto extends PaginationDto {
  // Herda paginação e ordenação
}

// Para compatibilidade com o controller
export interface FindAllQueryDto extends PaginationDto, SortDto {}
