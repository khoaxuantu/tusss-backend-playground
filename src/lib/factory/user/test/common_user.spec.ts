import { Test } from "@nestjs/testing";
import { CommonUserFactory } from "../common_user"
import { getModelToken } from "@nestjs/mongoose";
import { User } from "@/models/mongodb/user.schema";

describe('CommonUserFactory', () => {
  let commonUserFactory: CommonUserFactory

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CommonUserFactory,
      ]
    }).compile();

    commonUserFactory = moduleRef.get<CommonUserFactory>(CommonUserFactory);
  })

  describe('#create', () => {
    expect(commonUserFactory).toBeDefined();
  });
});
