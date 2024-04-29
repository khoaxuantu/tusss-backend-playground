import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModuleAsyncOptions } from "@nestjs/mongoose";
import { DatabaseConfiguration } from "../configuration";

export const connectMongo = (): MongooseModuleAsyncOptions => {
  return {
    useFactory: async (config: ConfigService) => ({
      uri: config.get('mongodb.uri'),
    }),
    imports: [ConfigModule.forRoot({ load: [DatabaseConfiguration] })],
    inject: [ConfigService],
  }
}
