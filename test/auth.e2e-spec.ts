import { AuthModule } from '@/auth/auth.module';
import { connectMongo } from '@/config/initialize/connect_mongo';
import { UserDtoStub } from '@/user/test/stubs/create_user.dto.stub';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { InvalidPasswordCase, InvalidPasswordStub } from './stubs/auth/password.stub';
import { Model } from 'mongoose';
import { User } from '@/models/mongodb/user.schema';
import { SignInDto } from '@/auth/dto/sign_in.dto';
import PasswordBuilder from '@/lib/builder/password/password.builder';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let userModel: Model<User>;
  let userDto: () => UserDtoStub = () => new UserDtoStub();

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule, MongooseModule.forRootAsync(connectMongo())],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    userModel = app.get<Model<User>>(getModelToken(User.name));
    await userModel.findOne();
  });

  afterAll(async () => {
    await userModel.deleteMany({});
    await app.close();
  });

  describe('/signup', () => {
    let subject = (userDto: UserDtoStub) => {
      return request(app.getHttpServer()).post('/signup').send(userDto);
    };

    describe('if valid input', () => {
      it('should create a new user', async () => {
        let dto = userDto();
        return subject(dto).expect(201);
      });
    });

    describe('if invalid input', () => {
      let dto: UserDtoStub;

      beforeEach(async () => {
        dto = userDto();
      });

      describe('with password', () => {
        Object.entries(InvalidPasswordCase)
          .filter((entry) => !isNaN(Number(entry[1])))
          .forEach((entry) => {
            describe(entry[0], () => {
              it('should return validation error', () => {
                dto.password = InvalidPasswordStub.create(entry[1] as InvalidPasswordCase);
                return subject(dto).expect(400);
              });
            });
          });
      });

      describe('with name', () => {
        it('should return validation error', () => {
          dto.name = undefined;
          return subject(dto).expect(400);
        });
      });

      describe('with mail', () => {
        it('should return validation error', () => {
          dto.email = undefined;
          return subject(dto).expect(400);
        });
      });
    });
  });

  describe('/signin', () => {
    let signInDto: () => SignInDto = () => {
      return { ...userDto() };
    };
    let subject = (signInDto: SignInDto) => {
      return request(app.getHttpServer()).post('/signin').send(signInDto);
    };

    describe('with valid password', () => {
      it('should return access token', async () => {
        return subject(signInDto())
          .expect(HttpStatus.OK)
          .then((response) => {
            console.log(response.body);
          });
      });
    });

    describe('with invalid password', () => {
      let dto = signInDto();
      dto.password = new PasswordBuilder().product;

      it('should return unauthorized error', async () => {
        return subject(dto).expect(HttpStatus.UNAUTHORIZED);
      });
    });
  });
});
