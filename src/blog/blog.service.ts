import { TCommonConfiguration } from '@/config/configuration.type';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BLOG } from './constant/blog.constant';
import { BlogResponseDto } from './dto/wp/blog.response.dto';

@Injectable()
export class BlogService {
  private site: string;

  constructor(configService: ConfigService) {
    this.site = configService.getOrThrow<TCommonConfiguration["blog"]["wp"]>("blog.wp");
  }

  async getById(id: number) {
    const res = await fetch(BLOG.WORDPRESS.PUBLIC_API_SITE_ENDPOINT(this.site, `/posts/${id}`));
    if (res.status == HttpStatus.NOT_FOUND) throw new NotFoundException();
    const data = new BlogResponseDto(await res.json());
    return data;
  }
}
