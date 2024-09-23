import { testMongoFilterDto } from "@/admin/resources/test/shared/shared-examples/mongo.dto";
import { POWER_RANK } from "@/lib/system/power";
import { STARTER_TYPE } from "@/player/constant/player.constant";
import { Types } from "mongoose";
import { ListPlayerResourceDto, PlayerResourceReadDto } from "../../dto/player-resource.read.dto";
import { testResourceReadDto } from "@/admin/resources/test/shared/shared-examples/read.dto";
import { testArrParamsTransform } from "@libs/test/shared-examples/transform.helper";

describe(PlayerResourceReadDto.name, () => {
  const testObjectId = new Types.ObjectId();

  testMongoFilterDto({
    dtoClass: PlayerResourceReadDto,
    testField: "_id",
    testValue: testObjectId.toString(),
    expectValue: testObjectId,
  });

  testMongoFilterDto({
    dtoClass: PlayerResourceReadDto,
    testField: "level",
    testValue: "3",
    expectValue: 3,
  });

  testMongoFilterDto({
    dtoClass: PlayerResourceReadDto,
    testField: "power_rank",
    testValue: POWER_RANK.KIM_DAN,
    expectValue: POWER_RANK.KIM_DAN,
  });

  testMongoFilterDto({
    dtoClass: PlayerResourceReadDto,
    testField: "starter_type",
    testValue: STARTER_TYPE.BALANCE,
    expectValue: STARTER_TYPE.BALANCE,
  });
});

testResourceReadDto({
  dtoClass: ListPlayerResourceDto,
  filterDtoClass: PlayerResourceReadDto,
  testOr: () => {
    testArrParamsTransform({
      cls: ListPlayerResourceDto,
      singleObj: [{}],
      arrObj: [{}, {}],
      expectedArrObj: [new PlayerResourceReadDto(), new PlayerResourceReadDto()],
      expectedSingleObj: [new PlayerResourceReadDto()],
    });
  },
});
