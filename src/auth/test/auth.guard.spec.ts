import { Test } from '@nestjs/testing';
import { AuthGuard } from '../auth.guard';
import { JwtService } from '@nestjs/jwt';
import { PartialFuncReturn, createMock } from '@golevelup/ts-jest';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { accessTokenStub } from './stub/jwt.stub';
import { userDocumentStub } from '@test/stubs/users.stub';
import { Reflector } from '@nestjs/core';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let reflector: Reflector;
  let partialExecCtx = (token: string): PartialFuncReturn<ExecutionContext> => {
    return {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: token,
          },
        }),
      }),
    };
  };
  let mockExecutionContext = (token: string) => createMock<ExecutionContext>(partialExecCtx(token));

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn().mockResolvedValue({
              sub: userDocumentStub()._id,
              username: userDocumentStub().name,
            }),
          },
        },
        Reflector,
      ],
    }).compile();

    guard = moduleRef.get<AuthGuard>(AuthGuard);
    reflector = moduleRef.get<Reflector>(Reflector);
  });

  it('should be defined', () => {
    expect(AuthGuard).toBeDefined();
  });

  describe('private API', () => {
    beforeEach(() => {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false);
    })

    test('invalid token', () => {
      const mockExecCtx = mockExecutionContext('Invalid token');
      expect(guard.canActivate(mockExecCtx)).rejects.toThrow(UnauthorizedException);
    });

    test('Bearer but no token', () => {
      const mockExecCtx = mockExecutionContext('Bearer ');
      expect(guard.canActivate(mockExecCtx)).rejects.toThrow(UnauthorizedException);
    });

    test('valid token', async () => {
      const mockExecCtx = mockExecutionContext(`Bearer ${accessTokenStub}`);
      expect(await guard.canActivate(mockExecCtx)).toEqual(true);
    });
  })

  test('public API', async () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);
    const mockExecCtx = mockExecutionContext(undefined);
    expect (await guard.canActivate(mockExecCtx)).toEqual(true);
  })
});
