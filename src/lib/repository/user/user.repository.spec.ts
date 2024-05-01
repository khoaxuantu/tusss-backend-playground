import { UserRepository } from './user.repository';
import { Test } from '@nestjs/testing';
import { User } from '@/models/mongodb/user.schema';
import { userDocumentStub } from '@test/stubs/users.stub';
import { getModelToken } from '@nestjs/mongoose';
import { FindUserOpt } from './interface/find_user.interface';

const CORRECT_DOCUMENT = 'should return correct document';

describe('UserRepository', () => {
  let repository: UserRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getModelToken(User.name),
          useValue: {
            findOne: jest.fn().mockReturnThis(),
            findById: jest.fn().mockReturnThis(),
            exec: jest.fn().mockReturnValue(userDocumentStub()),
          },
        },
      ],
    }).compile();

    repository = moduleRef.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(UserRepository).toBeDefined();
  });

  describe('findOne()', () => {
    let itBehavesLike = (statement: string, opts: FindUserOpt) => {
      it(statement, async () => {
        expect(await repository.findOne(opts)).toEqual(userDocumentStub());
      });
    };

    describe('find by name', () => {
      itBehavesLike(CORRECT_DOCUMENT, { name: userDocumentStub().name });
    });

    describe('find by _id', () => {
      itBehavesLike(CORRECT_DOCUMENT, { _id: userDocumentStub()._id });
    });

    describe('find by email', () => {
      itBehavesLike(CORRECT_DOCUMENT, { email: userDocumentStub().email });
    });
  });

  test('findById()', async () => {
    let id = userDocumentStub()._id;
    expect(await repository.findById(id)).toEqual(userDocumentStub());
  });
});
