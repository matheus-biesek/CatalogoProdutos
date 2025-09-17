import {
  Controller,
  Get,
  Param,
  Query,
  ValidationPipe,
  UsePipes,
  HttpStatus,
  HttpCode
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiParam, 
  ApiQuery,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse
} from '@nestjs/swagger';
import { ProductService } from './product.service';
import type { FindAllQueryDto } from './dto/find-all.dto';
import { SearchDto } from './dto/search.dto';
import { ParamIdDto } from './dto/param-id.dto';
import {
  ProductResponseDto,
  PaginatedProductsResponseDto
} from './dto/product-response.dto';
import { 
  ErrorResponseDto, 
  NotFoundErrorResponseDto, 
  InternalServerErrorResponseDto 
} from './dto/error-response.dto';

@ApiTags('products')
@Controller('products')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Listar produtos',
    description: 'Retorna uma lista paginada de produtos com opções de ordenação'
  })
  @ApiQuery({ 
    name: 'page', 
    required: false, 
    description: 'Número da página',
    example: 1,
    type: Number
  })
  @ApiQuery({ 
    name: 'limit', 
    required: false, 
    description: 'Quantidade de itens por página',
    example: 10,
    type: Number
  })
  @ApiQuery({ 
    name: 'sortField', 
    required: false, 
    description: 'Campo para ordenação',
    enum: ['name', 'price', 'description', 'stockQuantity', 'imageUrl'],
    example: 'name'
  })
  @ApiQuery({ 
    name: 'sortDirection', 
    required: false, 
    description: 'Direção da ordenação',
    enum: ['asc', 'desc'],
    example: 'asc'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de produtos retornada com sucesso',
    type: PaginatedProductsResponseDto
  })
  @ApiBadRequestResponse({ 
    description: 'Parâmetros inválidos',
    type: ErrorResponseDto
  })
  @ApiInternalServerErrorResponse({ 
    description: 'Erro interno do servidor',
    type: InternalServerErrorResponseDto
  })
  async findAll(@Query() query: FindAllQueryDto) {
    return await this.productService.findAll(
      query.page,
      query.limit,
      query.sortField,
      query.sortDirection
    );
  }

  @Get('search')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Pesquisar produtos',
    description: 'Pesquisa produtos por nome usando termo de busca'
  })
  @ApiQuery({ 
    name: 'term', 
    required: true, 
    description: 'Termo para busca de produtos',
    example: 'notebook'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Produtos encontrados com sucesso',
    type: [ProductResponseDto]
  })
  @ApiBadRequestResponse({ 
    description: 'Termo de busca inválido',
    type: ErrorResponseDto
  })
  @ApiNotFoundResponse({ 
    description: 'Nenhum produto encontrado',
    type: NotFoundErrorResponseDto
  })
  @ApiInternalServerErrorResponse({ 
    description: 'Erro interno do servidor',
    type: InternalServerErrorResponseDto
  })
  async search(@Query() searchDto: SearchDto) {
    return await this.productService.search(searchDto.term);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Buscar produto por ID',
    description: 'Retorna um produto específico pelo seu ID único'
  })
  @ApiParam({
    name: 'id',
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
    },
    schema: {
      type: 'string',
      oneOf: [
        { pattern: '^[0-9a-fA-F]{24}$', description: 'MongoDB ObjectId' },
        { pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$', description: 'MySQL UUID' }
      ]
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Produto encontrado com sucesso',
    type: ProductResponseDto
  })
  @ApiBadRequestResponse({ 
    description: 'ID inválido',
    type: ErrorResponseDto
  })
  @ApiNotFoundResponse({ 
    description: 'Produto não encontrado',
    type: NotFoundErrorResponseDto
  })
  @ApiInternalServerErrorResponse({ 
    description: 'Erro interno do servidor',
    type: InternalServerErrorResponseDto
  })
  async findById(@Param() params: ParamIdDto) {
    return await this.productService.findById(params.id);
  }
}
