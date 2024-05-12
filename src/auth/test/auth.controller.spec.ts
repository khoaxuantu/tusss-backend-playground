import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { UserService } from '@/user/user.service';
import { userDocumentStub, userStub } from '@test/stubs/users.stub';
import { User } from '@/user/schema/user.schema';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { accessTokenStub } from './stub/jwt.stub';
import { UserDtoStub } from './stub/create_user.dto.stub';

describe('AuthController', () => {
  let controller: AuthController;
  let service: UserService;
  let savedUser: User;
  let userDto: UserDtoStub;

  beforeEach(async () => {
    userDto = new UserDtoStub();
    savedUser = userStub(userDto.password);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        JwtService,
        {
          provide: UserService,
          useValue: {
            saveOne: jest.fn().mockResolvedValue(savedUser),
            getOneByEmail: jest.fn().mockResolvedValue(userDocumentStub()),
          },
        },
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn().mockResolvedValue({ access_token: accessTokenStub }),
          }
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('/signup', () => {
    let subject = async (userDto: UserDtoStub) => {
      return controller.signUp(userDto);
    };

    it('should be defined', () => {
      expect(controller.signUp).toBeDefined();
    });

    describe('if valid input', () => {
      it('should create a new user', async () => {
        expect(await subject(userDto)).toMatch(/success/);
      });
    });
  });

  describe('/signin', () => {
    it('should be defined', () => {
      expect(controller.signIn).toBeDefined();
    });

    test('get access token', async () => {
      const res = await controller.signIn({ user: userDocumentStub() });
      expect(res.access_token).toEqual(accessTokenStub);
    })
  });
});
