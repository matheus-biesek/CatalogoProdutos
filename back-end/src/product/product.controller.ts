import { 
  Controller, 
  Get, 
  Param, 
  Query, 
  ParseUUIDPipe, 
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
    description: 'ID único do produto',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid'
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
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.productService.findById(id);
  }
}
