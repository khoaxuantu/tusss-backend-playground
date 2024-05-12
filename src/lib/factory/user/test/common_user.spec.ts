import { Test } from '@nestjs/testing';
import { CommonUserFactory } from '../common_user';
import { User } from '@/user/schema/user.schema';
import { userStub } from '@test/stubs/users.stub';
import { getModelToken } from '@nestjs/mongoose';
import { UserModelMock } from '@test/mock/model/mongodb/user.mock';

describe('CommonUserFactory', () => {
  let commonUserFactory: CommonUserFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CommonUserFactory,
        {
          provide: getModelToken(User.name),
          useValue: jest.fn().mockImplementation(() => new UserModelMock()),
        },
      ],
    }).compile();

    commonUserFactory = moduleRef.get<CommonUserFactory>(CommonUserFactory);
  });

  it('should be defined', () => {
    expect(commonUserFactory).toBeDefined();
  });

  test('#create', async () => {
    const subject = await commonUserFactory.create(userStub());
    const expectUser = userStub();
    expect(subject.name).toEqual(expectUser.name);
    expect(subject.password).toEqual(expectUser.password);
    expect(subject.email).toEqual(expectUser.email);
  });
});
