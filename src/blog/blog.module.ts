import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [BlogController],
  providers: [BlogService, ConfigService]
})
export class BlogModule {}
