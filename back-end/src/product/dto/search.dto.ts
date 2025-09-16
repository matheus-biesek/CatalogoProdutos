import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchDto {
  @ApiProperty({
    description: 'Termo para busca de produtos por nome',
    example: 'notebook',
    minLength: 2,
    required: true
  })
  @IsString({ message: 'Termo de busca deve ser uma string' })
  @IsNotEmpty({ message: 'Termo de busca é obrigatório' })
  @MinLength(2, { message: 'Termo de busca deve ter pelo menos 2 caracteres' })
  term: string;
}
