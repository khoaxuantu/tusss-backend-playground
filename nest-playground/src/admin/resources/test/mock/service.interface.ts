export const MockAbstractResourceService = jest.fn().mockReturnValue({
  findById: () => null,
  listByFilter: () => null,
  listByManyIds: () => null,
  createOne: () => null,
  updateOne: () => null,
  deleteOne: () => null,
});
