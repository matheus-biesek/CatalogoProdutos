import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class SearchDto {
  @IsString({ message: 'Termo de busca deve ser uma string' })
  @IsNotEmpty({ message: 'Termo de busca é obrigatório' })
  @MinLength(2, { message: 'Termo de busca deve ter pelo menos 2 caracteres' })
  term: string;
}
