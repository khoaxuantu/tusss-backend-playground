import { Test } from "@nestjs/testing";
import { UserModelMock } from "@test/mock/model/mongodb/user.mock";
import { SCHEMA_NAME } from "../constant/schema.constant";
import { AdminRepository } from "./admin.repository";
import { getModelToken } from "@nestjs/mongoose";

describe('AdminRepository', () => {
  let repository: AdminRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AdminRepository,
        {
          provide: getModelToken(SCHEMA_NAME.ADMIN),
          useClass: UserModelMock,
        }
      ]
    }).compile();

    repository = moduleRef.get(AdminRepository);
  })

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
