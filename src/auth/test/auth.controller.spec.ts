import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { UserService } from '@/user/user.service';
import { userStub } from '@test/stubs/users.stub';
import { UserDtoStub } from '@/user/test/stubs/create_user.dto.stub';
import { InvalidPasswordCase, InvalidPasswordStub } from '@test/stubs/password.stub';

describe('AuthController', () => {
  let controller: AuthController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: UserService,
          useValue: {
            saveOne: jest.fn().mockReturnValue(userStub()),
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

  describe('/create', () => {
    let userDto: UserDtoStub;
    let subject = (userDto: UserDtoStub) => {
      return controller.signUp(userDto);
    };

    it('should be defined', () => {
      expect(controller.signUp).toBeDefined();
    });

    describe('if valid input', () => {
      userDto = new UserDtoStub();

      it('should create a new user', () => {

        expect(subject(userDto)).toMatch(/success/);
      });
    });

    describe('if invalid input', () => {
      describe('with password', () => {
        Object.entries(InvalidPasswordCase)
          .filter((entry) => !isNaN(Number(entry[1])))
          .forEach((entry) => {
            describe(entry[0], () => {
              it('create method should not be called', () => {
                userDto.password = InvalidPasswordStub.create(entry[1] as InvalidPasswordCase);
                subject(userDto);
                expect(service.saveOne).not.toHaveBeenCalled();
              });
            });
          });
      });

      describe('with name', () => {
        it('create_method should not be called', () => {
          userDto.name = undefined;
          subject(userDto);
          expect(service.saveOne).not.toHaveBeenCalled();
        })
      })

      describe('with mail', () => {
        it('create_method should not be called', () => {
          userDto.email = undefined;
          subject(userDto);
          expect(service.saveOne).not.toHaveBeenCalled();
        })
      })
    });
  });
});
