import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { DatabaseConfiguration } from '../configuration';

export const connectMongo = (): MongooseModuleAsyncOptions => {
  return {
    useFactory: async (config: ConfigService) => {
      console.log(config.get<string>('mongodb.uri'));
      console.log(config.get('mongodb.database'));

      return {
        uri: config.get('mongodb.uri'),
        dbName: config.get('mongodb.database'),
      };
    },
    imports: [ConfigModule.forRoot({ load: [DatabaseConfiguration] })],
    inject: [ConfigService],
  };
};
