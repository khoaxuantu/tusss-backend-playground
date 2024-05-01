import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { SignInDto } from '../dto/sign_in.dto';
import { userDocumentStub, userStub, userToClientStub } from '@test/stubs/users.stub';
import PasswordBuilder from '@/lib/builder/password/password.builder';
import { UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/user/user.service';

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
            sendUserInfoToClient: jest.fn().mockResolvedValue(userToClientStub()),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn()', () => {
    let signIn = (signInDto: SignInDto) => {
      return service.signIn(signInDto);
    }
    let signInDto = (pwd?: string): SignInDto => {
      return { email: userStub().email, password: pwd ?? userStub().password };
    }

    it('should be defined', () => {
      expect(service.signIn).toBeDefined();
    });

    describe('when valid input', () => {
      it('should log user in', async () => {
        const result = await signIn(signInDto());
        expect(result.password).toBeUndefined();
        expect(result).toEqual(userToClientStub());
      });
    })

    describe('when wrong password', () => {
      let wrongPassword = new PasswordBuilder().product;

      it('should return failed authentication', async () => {
        expect(signIn(signInDto(wrongPassword))).rejects.toThrow(UnauthorizedException);
      })
    })
  })
});
