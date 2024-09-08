import { MongoFilterObjectId } from "../../dto/mongo.dto";

describe(MongoFilterObjectId.name, () => {
  test('falsy input', () => {
    expect(new MongoFilterObjectId(undefined)).toEqual({});
    expect(new MongoFilterObjectId(null)).toEqual({});
  });
});
