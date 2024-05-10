import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { UserService } from '@/user/user.service';
import { userDocumentStub, userStub } from '@test/stubs/users.stub';
import { UserDtoStub } from '@/user/test/stubs/create_user.dto.stub';
import { User } from '@/user/schema/user.schema';
import { SignInDto } from '../dto/sign_in.dto';
import PasswordBuilder from '@/lib/builder/password/password.builder';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';

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
        AuthService,
        JwtService,
        {
          provide: UserService,
          useValue: {
            saveOne: jest.fn().mockResolvedValue(savedUser),
            getOneByEmail: jest.fn().mockResolvedValue(userDocumentStub()),
          },
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
    let signIn = (signInDto: SignInDto) => {
      return controller.signIn(signInDto);
    };
    let signInDto = (pwd?: string): SignInDto => {
      return { email: userStub().email, password: pwd ?? userStub().password };
    };

    it('should be defined', () => {
      expect(controller.signIn).toBeDefined();
    });

    describe('when wrong password', () => {
      let wrongPassword = new PasswordBuilder().product;

      it('should return failed authentication', async () => {
        expect(signIn(signInDto(wrongPassword))).rejects.toThrow(UnauthorizedException);
      });
    });
  });
});
