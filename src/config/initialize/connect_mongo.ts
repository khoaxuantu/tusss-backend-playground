import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModuleAsyncOptions } from "@nestjs/mongoose";
import { DatabaseConfiguration } from "../configuration";

export const connectMongo = (): MongooseModuleAsyncOptions => {
  return {
    useFactory: async (config: ConfigService) => {
      console.log(config);
      console.log(config.get<string>('mongodb.uri'));

      return {
        uri: config.get('mongodb.uri'),
        useCreateIndex: true,
      };
    },
    imports: [ConfigModule.forRoot({ load: [DatabaseConfiguration] })],
    inject: [ConfigService],
  }
}
