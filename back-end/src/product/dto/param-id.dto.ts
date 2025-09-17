import { IsString, IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ParamIdDto {
  @ApiProperty({
    description: 'ID único do produto (ObjectId do MongoDB ou UUID do MySQL)',
    examples: {
      mongodb: {
        summary: 'MongoDB ObjectId',
        value: '64f1a2b3c4d5e6f7g8h9i0j1'
      },
      mysql: {
        summary: 'MySQL UUID',
        value: '550e8400-e29b-41d4-a716-446655440000'
      }
    }
  })
  @IsString({ message: 'ID deve ser uma string' })
  @IsNotEmpty({ message: 'ID é obrigatório' })
  @Matches(
    /^([0-9a-fA-F]{24}|[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})$/i,
    {
      message: 'ID deve ser um ObjectId válido do MongoDB (24 caracteres hex) ou UUID válido do MySQL',
    },
  )
  id: string;  
}