import { Test } from "@nestjs/testing";
import { AdminService } from "../admin.service";
import { AdminRepository } from "@/lib/repository/admin/admin.repository";

describe('AdminService', () => {
  let service: AdminService;
  let repository: AdminRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: AdminRepository,
          useValue: {
            findOne: jest.fn(),
          },
        }
      ],
    }).compile();

    service = moduleRef.get(AdminService);
    repository = moduleRef.get(AdminRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('getOneByEmail', async () => {
    const mockRepository = jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    await service.getOneByEmail('abc@xyz.com');
    expect(mockRepository).toHaveBeenCalledTimes(1);
  });
});
