import { printDeepObject } from "@/lib/helper/print.helper";
import { AuthorResponseDto } from "./author.response.dto";

export class BlogResponseDto {
  ID: number;
  site_ID: number;
  author: AuthorResponseDto;
  date: Date;
  modified: Date;
  title: string;
  short_URL: string;
  content: string;
  slug: string;
  featured_image: string;

  constructor(data: BlogResponseDto) {
    printDeepObject(data, "🚀 ~ BlogResponseDto ~ constructor ~ data");
    this.ID = data.ID;
    this.site_ID = data.site_ID;
    this.author = new AuthorResponseDto(data.author);
    this.date = new Date(data.date);
    this.modified = new Date(data.modified);
    this.title = data.title;
    this.short_URL = data.short_URL;
    this.content = data.content;
    this.slug = data.slug;
    this.featured_image = data.featured_image;
  }
}
