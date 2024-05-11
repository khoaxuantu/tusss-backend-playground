import { Test, TestingModule } from "@nestjs/testing";
import { JwtAuthGuard } from "../guard/jwt_auth.guard";

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [JwtAuthGuard],
    }).compile();

    guard = moduleRef.get(JwtAuthGuard);
  })

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
})
