import { Test, TestingModule } from '@nestjs/testing';
import { LocalStrategy } from '../strategy/local.strategy';
import { AuthService } from '../auth.service';
import { userToClientStub } from '@test/stubs/users.stub';

describe('LocalStrategy', () => {
  let strategy: LocalStrategy;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        {
          provide: AuthService,
          useValue: {
            validate: userToClientStub(),
          },
        },
      ],
    }).compile();

    strategy = moduleRef.get(LocalStrategy);
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });
});
