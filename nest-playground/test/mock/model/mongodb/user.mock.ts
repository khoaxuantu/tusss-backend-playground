import { User } from '@/user/schema/user.schema';
import { UpdateUserDtoStub } from '@/user/test/stubs/update_user.dto.stub';
import { userDocumentStub } from '@test/stubs/users.stub';

export class UserModelMock {
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

  findOneAndUpdate() {
    const dto = new UpdateUserDtoStub();
    UserModelMock.data.name = dto.name;
    UserModelMock.data.email = dto.email;
    UserModelMock.data.password = undefined;
    return this;
  }

  exec() {
    return UserModelMock.data;
  }

  save() {
    return UserModelMock.data;
  }
}
