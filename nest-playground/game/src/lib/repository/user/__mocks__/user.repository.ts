import { mockRepository } from "@libs/test/mocks/repository";

export const UserRepository = jest.fn().mockReturnValue(mockRepository());
