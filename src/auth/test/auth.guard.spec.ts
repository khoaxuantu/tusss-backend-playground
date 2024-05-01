import { Test } from '@nestjs/testing';
import { AuthGuard } from '../auth.guard';
import { JwtService } from '@nestjs/jwt';
import { PartialFuncReturn, createMock } from '@golevelup/ts-jest';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { accessTokenStub } from './stub/jwt.stub';
import { userDocumentStub } from '@test/stubs/users.stub';

describe('AuthGuard', () => {
  let guard: AuthGuard;
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
      ],
    }).compile();

    guard = moduleRef.get<AuthGuard>(AuthGuard);
  });

  it('should be defined', () => {
    expect(AuthGuard).toBeDefined();
  });

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
});
