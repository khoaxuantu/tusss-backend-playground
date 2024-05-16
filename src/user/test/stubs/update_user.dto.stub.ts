import { UserDtoStub } from "@/auth/test/stub/create_user.dto.stub";
import { UpdateUserDto } from "@/user/dto/update_user.dto";
import { userDocumentStub } from "@test/stubs/users.stub";

export class UpdateUserDtoStub extends UserDtoStub {
  _id: string;

  create(props: any = {
    name: 'NewName',
    email: 'new@email.com',
    _id: userDocumentStub()._id.toString(),
  } as UpdateUserDto) {
    const { _id, ...updateProps } = props as UpdateUserDto;
    this._id = _id;
    super.create({ ...updateProps, password: undefined });
  }

  withObjectId(id: string) {
    this._id = id;
    return this;
  }
}
