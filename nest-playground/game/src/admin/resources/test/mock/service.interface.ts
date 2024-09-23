export const MockAbstractResourceService = jest.fn().mockReturnValue({
  findById: jest.fn(),
  listByFilter: jest.fn(),
  listByManyIds: jest.fn(),
  createOne: jest.fn(),
  updateOne: jest.fn(),
  deleteOne: jest.fn(),
});
