import { Test, TestingModule } from "@nestjs/testing";
import { RolesGuard } from "../guard/roles.guard";

describe('RolesGuard', () => {
  let guard: RolesGuard;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [RolesGuard],
    }).compile();

    guard = moduleRef.get(RolesGuard);
  })

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
})
