import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { ConfigModule } from '@nestjs/config';
import { CommonConfiguration } from '@/config/configuration';
import { userStub } from '@test/stubs/users.stub';
import { UserDtoStub } from './stubs/create_user.dto.stub';
import { InvalidPasswordCase, InvalidPasswordStub } from '@test/stubs/password.stub';

describe('UserController', () => {
  let controller: UserController;
  let module: TestingModule;
  let service: UserService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            saveOne: jest.fn().mockReturnValue(userStub()),
          },
        },
      ],
      imports: [ConfigModule.forRoot({ load: [CommonConfiguration] })],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('/:id', () => {
    it('should be defined', () => {
      expect(controller.getOne).toBeDefined();
    });
  })
});
