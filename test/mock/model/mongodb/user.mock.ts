import { User } from '@/user/schema/user.schema';
import { userDocumentStub } from '@test/stubs/users.stub';

export class UserQueryMock {
  static data: User = userDocumentStub();

  static resetData() {
    this.data = userDocumentStub();
  }

  findOne() {
    return this;
  }

  findById() {
    return this;
  }

  exec() {
    return UserQueryMock.data;
  }
}
