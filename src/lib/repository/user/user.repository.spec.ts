import { UserRepository } from './user.repository';
import { Test } from '@nestjs/testing';
import { User } from '@/models/mongodb/user.schema';
import { userDocumentNoIdStub, userDocumentStub } from '@test/stubs/users.stub';
import { getModelToken } from '@nestjs/mongoose';
import { FindUserOpt } from './interface/find_user.interface';
import { Model } from 'mongoose';
import { UserQueryMock } from '@test/mock/model/mongodb/user.mock';

const CORRECT_DOCUMENT = 'should return correct document';

describe('UserRepository', () => {
  let repository: UserRepository;
  let model: Model<User>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getModelToken(User.name),
          useClass: UserQueryMock,
        },
      ],
    }).compile();

    repository = moduleRef.get<UserRepository>(UserRepository);
    model = moduleRef.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(UserRepository).toBeDefined();
  });

  describe('findOne()', () => {
    let itBehavesLike = (statement: string, opts: FindUserOpt) => {
      let projectNoId = { _id: 0 }

      it(statement, async () => {
        expect(await repository.findOne(opts)).toEqual(userDocumentStub());
      });

      describe("(no _id)", () => {
        beforeEach(() => {
          UserQueryMock.data = userDocumentNoIdStub();
        })

        afterEach(() => {
          UserQueryMock.resetData();
        })

        it(statement, async () => {
          const result = await repository.findOne(opts, projectNoId);
          expect(result._id).toBeUndefined();
          expect(result).toEqual(userDocumentNoIdStub());
        })
      })
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
