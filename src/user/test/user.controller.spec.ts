import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { ConfigModule } from '@nestjs/config';
import { CommonConfiguration } from '@/config/configuration';
import { userDocumentStub, userStub } from '@test/stubs/users.stub';
import { UpdateUserDtoStub } from './stubs/update_user.dto.stub';

describe('UserController', () => {
  let controller: UserController;
  let module: TestingModule;
  let service: UserService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            saveOne: jest.fn().mockReturnValue(userStub()),
            updateOne: jest.fn().mockReturnValue({}),
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
  });

  describe('/profile', () => {
    it('should be defined', () => {
      expect(controller.getProfile).toBeDefined();
    })

    test('return profile', () => {
      const res = controller.getProfile({ user: userDocumentStub() });
      expect(res).toEqual(userDocumentStub());
    })
  })

  describe('/profile/update', () => {
    let updateUserDto = () => new UpdateUserDtoStub();

    it('should be defined', () => {
      expect(controller.updateProfile).toBeDefined();
    })

    test('update', async () => {
      const dto = updateUserDto();
      const res = await controller.updateProfile(dto);
      expect(res.status).toEqual('success');
    })
  })
});
