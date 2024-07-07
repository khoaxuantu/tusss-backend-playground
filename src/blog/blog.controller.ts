import { Public } from '@/auth/decorator/auth.decorator';
import { Controller, Get, Param } from '@nestjs/common';
import { BlogService } from './blog.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('blog')
@ApiTags("Blog")
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get(":id")
  @Public()
  async getOne(@Param("id") blogId: number) {
    const data = await this.blogService.getById(blogId);
    return data;
  }
}
