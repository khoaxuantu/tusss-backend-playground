import { UserDocument } from '@/user/schema/user.schema';
import { UpdateUserDtoStub } from '@/user/test/stubs/update_user.dto.stub';
import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { UserModelMock } from '@test/mock/model/mongodb/user.mock';
import { userDocumentNoIdStub, userDocumentStub } from '@test/stubs/users.stub';
import { FilterQuery, Types } from 'mongoose';
import { SCHEMA_NAME } from '../constant/schema.constant';
import { FindUserOpt } from './interfaces/find_user.interface';
import { UserRepository } from './user.repository';

const CORRECT_DOCUMENT = 'should return correct document';

describe('UserRepository', () => {
  let repository: UserRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getModelToken(SCHEMA_NAME.USER),
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
        expect(await repository.findOne(opts as FilterQuery<UserDocument>)).toEqual(
          userDocumentStub(),
        );
      });

      describe('(no _id)', () => {
        beforeEach(() => {
          UserModelMock.data = userDocumentNoIdStub();
        });

        afterEach(() => {
          UserModelMock.resetData();
        });

        it(statement, async () => {
          const result = await repository.findOne(opts as FilterQuery<UserDocument>, projectNoId);
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
    let id = userDocumentStub()._id.toString();
    expect(await repository.findById(id)).toEqual(userDocumentStub());
  });

  test('findOneAndUpdate()', async () => {
    const { _id, ...dto } = new UpdateUserDtoStub();
    const res = await repository.findOneAndUpdate({ _id: new Types.ObjectId(_id) }, dto);

    expect({ name: res.name, email: res.email }).toEqual(dto);
    expect(res.password).toBeUndefined();
  });
});
