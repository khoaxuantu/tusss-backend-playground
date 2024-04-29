import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { CommonUserFactory } from '@/lib/factory/user/common_user';
import { userStub } from '@test/stubs/users.stub';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '@/models/mongodb/user.schema';

describe('UserService', () => {
  let service: UserService;

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
            }
          })
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('#saveOne', async () => {
    const subject = await service.saveOne(userStub());
    const expectUser = userStub();
    expect(subject.name).toEqual(expectUser.name);
    expect(subject.password).toEqual(expectUser.password);
    expect(subject.email).toEqual(expectUser.email);
  })
});
