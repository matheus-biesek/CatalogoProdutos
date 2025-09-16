import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from './pagination.dto';
import { SortDto } from './sort.dto';

export class FindAllDto extends PaginationDto {}

export interface FindAllQueryDto extends PaginationDto, SortDto {}
