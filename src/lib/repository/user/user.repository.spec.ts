import { UserRepository } from './user.repository';
import { Test } from '@nestjs/testing';
import { User } from '@/user/schema/user.schema';
import { userDocumentNoIdStub, userDocumentStub } from '@test/stubs/users.stub';
import { getModelToken } from '@nestjs/mongoose';
import { FindUserOpt } from './interfaces/find_user.interface';
import { UserModelMock } from '@test/mock/model/mongodb/user.mock';
import { UpdateUserDtoStub } from '@/user/test/stubs/update_user.dto.stub';
import { Types } from 'mongoose';

const CORRECT_DOCUMENT = 'should return correct document';

describe('UserRepository', () => {
  let repository: UserRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getModelToken(User.name),
          useClass: UserModelMock,
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
      let projectNoId = { _id: 0 };

      it(statement, async () => {
        expect(await repository.findOne(opts)).toEqual(userDocumentStub());
      });

      describe('(no _id)', () => {
        beforeEach(() => {
          UserModelMock.data = userDocumentNoIdStub();
        });

        afterEach(() => {
          UserModelMock.resetData();
        });

        it(statement, async () => {
          const result = await repository.findOne(opts, projectNoId);
          expect(result._id).toBeUndefined();
          expect(result).toEqual(userDocumentNoIdStub());
        });
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

  test('findOneAndUpdate()', async () => {
    const { _id, ...dto } = new UpdateUserDtoStub();
    const res = await repository.findOneAndUpdate({ _id: new Types.ObjectId(_id) }, dto);

    expect({ name: res.name, email: res.email }).toEqual(dto);
    expect(res.password).toBeUndefined();
  });
});
