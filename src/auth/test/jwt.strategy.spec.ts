import { Test, TestingModule } from "@nestjs/testing";
import { JwtStrategy } from "../strategy/jwt.strategy";

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [JwtStrategy],
    }).compile();

    strategy = moduleRef.get(JwtStrategy);
  })

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });
})
