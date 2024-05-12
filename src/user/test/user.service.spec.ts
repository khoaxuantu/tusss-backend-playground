import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { CommonUserFactory } from '@/lib/factory/user/common_user';
import { userDocumentStub, userStub, userToClientStub } from '@test/stubs/users.stub';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserDocument } from '@/user/schema/user.schema';
import { UserRepository } from '@/lib/repository/user/user.repository';
import { FindUserOpt } from '@/lib/repository/user/interface/find_user.interface';
import { UpdateUserDtoStub } from './stubs/update_user.dto.stub';

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;
  let factory: CommonUserFactory;
  const { name, email } = userStub();
  const dataToClient = userToClientStub();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: CommonUserFactory,
          useValue: {
            create: jest.fn().mockResolvedValue(userDocumentStub()),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            findOne: jest.fn().mockResolvedValue(dataToClient),
            findOneAndUpdate: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
    factory = module.get<CommonUserFactory>(CommonUserFactory);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('saveOne()', async () => {
    let spyMethod = jest.spyOn(factory, 'create');
    service.saveOne(userStub());
    expect(spyMethod).toHaveBeenCalledTimes(1);
  });

  test('getOneByUsername()', async () => {
    expect(await service.getOneByUsername(name)).toEqual(dataToClient);
  });

  test('getOneByEmail()', async () => {
    expect(await service.getOneByEmail(email)).toEqual(dataToClient);
  });

  describe('sendUserInfoToClient()', () => {
    test('input as User', async () => {
      expect(await service.sendUserInfoToClient(userStub())).toEqual(dataToClient);
    });

    test('input as FindUserOpt', async () => {
      let opt: FindUserOpt = { name, email };
      jest.spyOn(repository, 'findOne').mockResolvedValue(dataToClient as UserDocument);
      expect(await service.sendUserInfoToClient(opt)).toEqual(dataToClient);
    });
  });

  describe('updateOne()', () => {
    test('update', async () => {
      const dto = new UpdateUserDtoStub();
      const ret: UserDocument = dataToClient;
      ret.name = dto.name;
      ret.email = dto.email;

      const mock = jest.spyOn(repository, 'findOneAndUpdate').mockResolvedValue(ret);

      await service.updateOne(dto);

      expect(mock).toHaveBeenCalledTimes(1);
    })
  });
});
