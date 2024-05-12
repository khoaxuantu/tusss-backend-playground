import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { SignInDto } from '../dto/sign_in.dto';
import { userDocumentStub, userStub, userToClientStub } from '@test/stubs/users.stub';
import PasswordBuilder from '@/lib/builder/password/password.builder';
import { UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { accessTokenStub } from './stub/jwt.stub';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            getOneByEmail: jest.fn().mockResolvedValue(userDocumentStub()),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue(accessTokenStub),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validate()', () => {
    let validate = async (signInDto: SignInDto) => {
      return service.validate(signInDto);
    };
    let signInDto = (pwd?: string): SignInDto => {
      return { email: userStub().email, password: pwd ?? userStub().password };
    };

    it('should be defined', () => {
      expect(service.validate).toBeDefined();
    });

    describe('when valid input', () => {
      it('should log user in', async () => {
        const result = await validate(signInDto());
        const { password, ...expectRes} = userDocumentStub();
        expect(result).toEqual(expectRes);
      });
    });

    describe('when wrong password', () => {
      let wrongPassword = new PasswordBuilder().product;

      it('should return failed authentication', async () => {
        expect(validate(signInDto(wrongPassword))).rejects.toThrow(UnauthorizedException);
      });
    });
  });

  describe('signIn()', () => {
    it('should be defined', () => {
      expect(service.signIn).toBeDefined();
    })

    test('return access token', async () => {
      const res = await service.signIn(userDocumentStub());
      expect(res.access_token).toEqual(accessTokenStub);
    })
  })
});
