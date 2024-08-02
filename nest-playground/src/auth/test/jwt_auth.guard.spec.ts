import { Test, TestingModule } from "@nestjs/testing";
import { JwtAuthGuard } from "../guard/jwt_auth.guard";
import { ConfigModule } from "@nestjs/config";
import { CommonConfiguration } from "@/config/configuration";

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(CommonConfiguration)],
      providers: [JwtAuthGuard],
    }).compile();

    guard = moduleRef.get(JwtAuthGuard);
  })

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
})
