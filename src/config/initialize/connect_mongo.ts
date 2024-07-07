import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { DatabaseConfiguration } from '../configuration';
import { TDatabaseConfiguration } from '../configuration.type';

export const connectMongo = (): MongooseModuleAsyncOptions => {
  return {
    useFactory: async (config: ConfigService) => {
      const mongoConfig: TDatabaseConfiguration["mongodb"] = config.get('mongodb');
      console.log(mongoConfig.uri);
      console.log(mongoConfig.database);

      return {
        uri: mongoConfig.uri,
        dbName: mongoConfig.database,
      };
    },
    imports: [ConfigModule.forFeature(DatabaseConfiguration)],
    inject: [ConfigService],
  };
};
