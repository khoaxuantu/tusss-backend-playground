import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { NODE_ENV } from './config/environment';
import { UserModule } from './user/user.module';

const Configuration = () => configuration(`common/${NODE_ENV}.yaml`);

@Module({
  imports: [
    ConfigModule.forRoot({ load: [Configuration] }),
    CatsModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
