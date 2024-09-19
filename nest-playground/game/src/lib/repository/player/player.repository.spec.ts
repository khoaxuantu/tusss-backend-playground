import { Test } from "@nestjs/testing";
import { UserModelMock } from "@test/mock/model/mongodb/user.mock";
import { SCHEMA_NAME } from "../constant/schema.constant";
import { PlayerRepository } from "./player.repository";
import { getModelToken } from "@nestjs/mongoose";

describe(PlayerRepository.name, () => {
  let repository: PlayerRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PlayerRepository,
        {
          provide: getModelToken(SCHEMA_NAME.PLAYER),
          useClass: UserModelMock,
        }
      ]
    }).compile();

    repository = moduleRef.get(PlayerRepository);
  })

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
