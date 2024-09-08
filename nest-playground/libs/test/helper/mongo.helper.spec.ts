import { MongoHelper } from "../../helper/mongo.helper";
import { Types } from "mongoose";

describe('MongoHelper', () => {
  describe('getObjectIdAsString', () => {
    test('falsy object', () => {
      expect(MongoHelper.getObjectIdAsString(undefined)).toEqual("");
      expect(MongoHelper.getObjectIdAsString(null)).toEqual("");
    });

    test('Types.ObjectId', () => {
      const testId = new Types.ObjectId();
      expect(MongoHelper.getObjectIdAsString(testId)).toEqual(testId.toString());
    });

    test('have _id', () => {
      const testId = new Types.ObjectId();
      expect(MongoHelper.getObjectIdAsString({ _id: testId })).toEqual(testId.toString());
    });

    test('have id', () => {
      const testId = new Types.ObjectId().toString();
      expect(MongoHelper.getObjectIdAsString({ id: testId })).toEqual(testId);
    });

    test('none', () => {
      expect(MongoHelper.getObjectIdAsString({ a: 'a' })).toEqual("");
    })
  });
})
