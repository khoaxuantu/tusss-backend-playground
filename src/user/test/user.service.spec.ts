import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { CommonUserFactory } from '@/lib/factory/user/common_user';
import { userDocumentStub, userStub, userToClientStub } from '@test/stubs/users.stub';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '@/models/mongodb/user.schema';
import { UserRepository } from '@/lib/repository/user/user.repository';
import { FindUserOpt } from '@/lib/repository/user/interface/find_user.interface';

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        CommonUserFactory,
        {
          provide: getModelToken(User.name),
          useValue: jest.fn().mockImplementation(() => {
            return {
              constructor: jest.fn().mockReturnThis(),
              save: jest.fn().mockResolvedValue(userStub()),
            };
          }),
        },
        {
          provide: UserRepository,
          useValue: {
            findOne: jest.fn().mockResolvedValue(userDocumentStub()),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('saveOne()', async () => {
    const subject = await service.saveOne(userStub());
    const expectUser = userStub();
    expect(subject).toEqual(expectUser);
  });

  test('getOneByUsername()', async () => {
    expect(await service.getOneByUsername(userDocumentStub().name)).toEqual(userDocumentStub());
  });

  test('getOneByEmail()', async () => {
    expect(await service.getOneByEmail(userDocumentStub().email)).toEqual(userDocumentStub());
  });

  describe('sendUserInfoToClient()', () => {
    test('input as User', async () => {
      expect(await service.sendUserInfoToClient(userStub())).toEqual(userToClientStub());
    });

    test('input as FindUserOpt', async () => {
      let opt: FindUserOpt = {
        name: userStub().name,
        email: userStub().email,
      };

      const mock = jest.spyOn(repository, 'findOne').mockResolvedValue(userToClientStub());

      expect(await service.sendUserInfoToClient(opt)).toEqual(userToClientStub());

      mock.mockRestore();
    });
  });
});
