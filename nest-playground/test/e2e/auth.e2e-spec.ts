import { AuthModule } from '@/auth/auth.module';
import { SignInDto } from '@/auth/dto/sign_in.in.dto';
import { UserDtoStub } from '@/auth/test/stub/create_user.dto.stub';
import { InvalidPasswordCase, InvalidPasswordStub } from '@/auth/test/stub/password.stub';
import { connectMongo } from '@/config/initialize/connect_mongo';
import PasswordBuilder from '@/lib/builder/password/password.builder';
import { User } from '@/user/schema/user.schema';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Model } from 'mongoose';
import * as request from 'supertest';

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
        return subject(dto)
          .expect(HttpStatus.CREATED)
          .then((res) => console.log(res.text));
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
                return subject(dto).expect(HttpStatus.BAD_REQUEST);
              });
            });
          });
      });

      describe('with name', () => {
        it('should return validation error', () => {
          dto.name = undefined;
          return subject(dto).expect(HttpStatus.BAD_REQUEST);
        });
      });

      describe('with mail', () => {
        it('should return validation error', () => {
          dto.email = undefined;
          return subject(dto).expect(HttpStatus.BAD_REQUEST);
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
