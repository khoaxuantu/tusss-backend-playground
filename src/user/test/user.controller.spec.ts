import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { ConfigModule } from '@nestjs/config';
import { CommonConfiguration } from '@/config/configuration';
import { UserFactoryModule } from '@/lib/factory/user/user.module';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
      imports: [
        ConfigModule.forRoot({ load: [CommonConfiguration] }),
        UserFactoryModule,
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
