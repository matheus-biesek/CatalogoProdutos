import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({
    description: 'Código de status HTTP',
    example: 400
  })
  statusCode: number;

  @ApiProperty({
    description: 'Mensagem de erro',
    example: 'Página deve ser maior que 0'
  })
  message: string;

  @ApiProperty({
    description: 'Tipo do erro',
    example: 'Bad Request'
  })
  error: string;
}

export class NotFoundErrorResponseDto {
  @ApiProperty({
    description: 'Código de status HTTP',
    example: 404
  })
  statusCode: number;

  @ApiProperty({
    description: 'Mensagem de erro',
    example: 'Produto com ID 123e4567-e89b-12d3-a456-426614174000 não encontrado'
  })
  message: string;

  @ApiProperty({
    description: 'Tipo do erro',
    example: 'Not Found'
  })
  error: string;
}

export class InternalServerErrorResponseDto {
  @ApiProperty({
    description: 'Código de status HTTP',
    example: 500
  })
  statusCode: number;

  @ApiProperty({
    description: 'Mensagem de erro',
    example: 'Erro interno do servidor ao buscar produtos'
  })
  message: string;

  @ApiProperty({
    description: 'Tipo do erro',
    example: 'Internal Server Error'
  })
  error: string;
}
