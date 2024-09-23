import { AbstractModelRepository } from "../../interfaces/repository.interface";

export function mockRepository(override?: Record<keyof AbstractModelRepository<any>, any>) {
  return {
    create: jest.fn(),
    deleteOne: jest.fn(),
    findById: jest.fn(),
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    list: jest.fn(),
    ...override,
  } as Record<keyof AbstractModelRepository<any>, jest.Mock>;
}
