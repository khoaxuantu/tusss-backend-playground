import { UserDtoStub } from '@/auth/test/stub/create_user.dto.stub';
import { connectMongo } from '@/config/initialize/connect_mongo';
import { CommonUserFactory } from '@/lib/factory/user/common_user';
import { User } from '@/user/schema/user.schema';
import { UpdateUserDtoStub } from '@/user/test/stubs/update_user.dto.stub';
import { UserModule } from '@/user/user.module';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Model, ObjectId, Types } from 'mongoose';
import * as request from 'supertest';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let userFactory: CommonUserFactory;
  let userModel: Model<User>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UserModule, MongooseModule.forRootAsync(connectMongo())],
    }).compile();

    app = moduleRef.createNestApplication();
    userFactory = moduleRef.get<CommonUserFactory>(CommonUserFactory);
    userModel = moduleRef.get<Model<User>>(getModelToken(User.name));

    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  afterAll(async () => {
    await userModel.deleteMany({});
    await app.close();
  });

  it('/user (GET)', () => {
    const expectRes = "This is the User's entry route";
    return request(app.getHttpServer()).get('/user').expect(HttpStatus.OK).expect(expectRes);
  });

  describe('/user/profile/update (POST)', () => {
    let subject = () => {
      return request(app.getHttpServer()).patch('/user/profile/update');
    };
    let updateDto: UpdateUserDtoStub;
    let id: Types.ObjectId;

    beforeAll(async () => {
      const dto = new UserDtoStub().withAll();
      const res = await userFactory.create(dto);
      id = res._id;
    });

    beforeEach(() => {
      updateDto = new UpdateUserDtoStub().withObjectId(id.toString());
    })

    describe('when invalid body', () => {
      test('due to _id', async () => {
        const { _id, ...tmp } = updateDto;
        return subject()
          .send(tmp)
          .expect(HttpStatus.BAD_REQUEST)
          .then((res) => console.log(res.body));
      });

      test('due to email', async () => {
        const tmp = updateDto.withEmail("lmao");
        return subject()
          .send(tmp)
          .expect(HttpStatus.BAD_REQUEST)
          .then((res) => console.log(res.body));
      });

      test('due to phone number', async () => {
        const tmp = updateDto.withPhoneNumber("99922220000abc");
        return subject()
          .send(tmp)
          .expect(HttpStatus.BAD_REQUEST)
          .then((res) => console.log(res.body));
      });

      describe('due to age', () => {});
    });

    describe('when valid body', () => {
      test('update successfully', () => {
        return subject()
          .send(updateDto)
          .expect(HttpStatus.OK)
          .then((res) => console.log(res.body));
      });
    });
  });
});
