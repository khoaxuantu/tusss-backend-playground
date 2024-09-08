import { AbstractModelRepository } from "../../interfaces/repository.interface";

export function mockRepository() {
  return jest.fn().mockReturnValue({
    create: () => null,
    deleteOne: () => null,
    findById: () => null,
    findOne: () => null,
    findOneAndUpdate: () => null,
    list: () => null,
  } as Record<keyof AbstractModelRepository<any>, () => null>);
}
