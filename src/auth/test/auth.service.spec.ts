import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { SignInDto } from '../dto/sign_in.dto';
import { userDocumentStub, userStub, userToClientStub } from '@test/stubs/users.stub';
import PasswordBuilder from '@/lib/builder/password/password.builder';
import { UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { accessTokenStub } from './stub/jwt.stub';
import { AdminService } from '@/admin/admin.service';

describe('AuthService', () => {
  let service: AuthService;
  let adminService: AdminService;

  beforeAll(async () => {
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
        {
          provide: AdminService,
          useValue: {
            getOneByEmail: jest.fn().mockResolvedValue(userDocumentStub()),
          }
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    adminService = module.get(AdminService);
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
      describe('when log in as admin', () => {
        it('should log in by admin service', async () => {
          const mockAdminCall = jest.spyOn(adminService, 'getOneByEmail');
          const dto = signInDto();
          dto.isAdmin = true;
          await validate(dto);
          expect(mockAdminCall).toHaveBeenCalledTimes(1);
          mockAdminCall.mockRestore();
        });
      });

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
