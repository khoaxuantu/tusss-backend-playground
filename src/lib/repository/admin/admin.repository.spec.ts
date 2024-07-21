import { Test } from "@nestjs/testing";
import { AdminRepository } from "./admin.repository";
import { getModelToken } from "@nestjs/mongoose";
import { Admin } from "@/admin/schema/admin.schema";
import { UserModelMock } from "@test/mock/model/mongodb/user.mock";

describe('AdminRepository', () => {
  let repository: AdminRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AdminRepository,
        {
          provide: getModelToken(Admin.name),
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
