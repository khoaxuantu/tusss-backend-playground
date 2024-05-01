import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Redirect,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { CreateCatDto, createCatSchema } from './dto/create_cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { HttpExceptionFilter } from './http_exception.filter';
import { ZodValidationPipe } from './pipe/validation.pipe';

@Controller('cats')
export class CatsController {
  // private catService: CatsService;

  constructor(private catService: CatsService) {}

  @Post()
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  @UseFilters(new HttpExceptionFilter())
  @UsePipes(new ZodValidationPipe(createCatSchema))
  create(@Body() createCatDto: CreateCatDto): string {
    console.log(createCatDto);

    this.catService.newCat = createCatDto;

    return 'Add a cat';
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catService.all;
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: number,
  ): string {
    const cat = this.catService.getCat(id);

    return `This action returns a #${id} cat`;
  }

  @Get('ab*cd')
  findWildcard(): string {
    return 'This route use a wildcard';
  }

  @Get('docs')
  @Redirect('https://nestjs.com', 301)
  getDocs(@Query('version') version) {
    console.log(version);

    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
}
