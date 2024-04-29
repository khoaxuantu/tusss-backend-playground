import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private config: ConfigService) {}
  getHello(): string {
    console.log('Get config in app service', this.config.get('tusss'));

    return 'Hello World!';
  }
}
