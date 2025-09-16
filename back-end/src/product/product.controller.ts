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
import { ProductService } from './product.service';
import type { FindAllQueryDto } from './dto/find-all.dto';
import type { SearchDto } from './dto/search.dto';

@Controller('products')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /**
   * GET /products
   * Lista todos os produtos com paginação e ordenação
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() query: FindAllQueryDto) {
    return await this.productService.findAll(
      query.page,
      query.limit,
      query.sortField,
      query.sortDirection
    );
  }

  /**
   * GET /products/:id
   * Retorna um produto específico pelo ID
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.productService.findById(id);
  }

  /**
   * GET /products/search?term=xxx
   * Pesquisa produtos por nome
   */
  @Get('search')
  @HttpCode(HttpStatus.OK)
  async search(@Query() searchDto: SearchDto) {
    return await this.productService.search(searchDto.term);
  }
}
