import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { ConfigModule } from '@nestjs/config';
import { CommonConfiguration } from '@/config/configuration';
import { userStub } from '@test/stubs/users.stub';
import { CommonUserFactory } from '@/lib/factory/user/common_user';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: CommonUserFactory,
          useValue: {
            create: userStub(),
          }
        }
      ],
      imports: [
        ConfigModule.forRoot({ load: [CommonConfiguration] }),
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
