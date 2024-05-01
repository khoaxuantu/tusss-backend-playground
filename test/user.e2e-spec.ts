import { connectMongo } from '@/config/initialize/connect_mongo';
import { UserModule } from '@/user/user.module';
import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UserModule, MongooseModule.forRootAsync(connectMongo())],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/user (GET)', () => {
    const expectRes = "This is the User's entry route";
    return request(app.getHttpServer()).get('/user').expect(200).expect(expectRes);
  });
});
