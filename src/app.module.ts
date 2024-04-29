import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { ConfigModule } from '@nestjs/config';
import { CommonConfiguration } from './config/configuration';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    ConfigModule.forRoot({ load: [CommonConfiguration] }),
    CatsModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
