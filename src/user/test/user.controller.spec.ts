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

  describe('/create', () => {
    let userDto: UserDtoStub;
    let subject = (userDto: UserDtoStub) => {
      return controller.createOne(userDto);
    };

    it('should be defined', () => {
      expect(controller.createOne).toBeDefined();
    });

    describe('if valid input', () => {
      userDto = new UserDtoStub();

      it('should create a new user', () => {

        expect(subject(userDto)).toMatch(/success/);
      });
    });

    describe('if invalid input', () => {
      // beforeEach(() => {
      //   jest.spyOn(service, 'saveOne');
      // });

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

  describe('/:id', () => {
    it('should be defined', () => {
      expect(controller.getOne).toBeDefined();
    });
  })
});
