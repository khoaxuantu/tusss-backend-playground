import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { UserService } from '@/user/user.service';
import { userStub } from '@test/stubs/users.stub';
import { UserDtoStub } from '@/user/test/stubs/create_user.dto.stub';
import { User } from '@/models/mongodb/user.schema';

describe('AuthController', () => {
  let controller: AuthController;
  let service: UserService;
  let savedUser: User;
  let userDto: UserDtoStub;

  beforeEach(async () => {
    userDto = new UserDtoStub();
    savedUser = userStub(userDto.password);
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: UserService,
          useValue: {
            saveOne: jest.fn().mockReturnValue(savedUser),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('/signup', () => {
    let subject = async (userDto: UserDtoStub) => {
      return await controller.signUp(userDto);
    };

    it('should be defined', () => {
      expect(controller.signUp).toBeDefined();
    });

    describe('if valid input', () => {
      it('should create a new user', async () => {
        expect(await subject(userDto)).toMatch(/success/);
      });
    });
  });
});
