import { Test } from "@nestjs/testing";
import { CommonUserFactory } from "../common_user"
import { User } from "@/models/mongodb/user.schema";
import { userStub } from "@test/stubs/users.stub";
import { getModelToken } from "@nestjs/mongoose";



describe('CommonUserFactory', () => {
  let commonUserFactory: CommonUserFactory;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CommonUserFactory,
        {
          provide: getModelToken(User.name),
          useValue: jest.fn().mockImplementation(() => userStub()),
        }
      ]
    }).compile();

    commonUserFactory = moduleRef.get<CommonUserFactory>(CommonUserFactory);
  })

  it('should be defined', () => {
    expect(commonUserFactory).toBeDefined();
  })

  test('#create', () => {
    const subject = commonUserFactory.create(userStub());
    const expectUser = userStub();
    expect(subject.name).toEqual(expectUser.name);
    expect(subject.password).toEqual(expectUser.password);
    expect(subject.email).toEqual(expectUser.email);
  });
});
