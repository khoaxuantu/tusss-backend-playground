import { CreateUserDto } from "@/auth/dto/create_user.dto";
import { UserDtoStub } from "@/auth/test/stub/create_user.dto.stub";
import { UpdateUserDto } from "@/user/dto/update_user.dto";
import { userDocumentStub } from "@test/stubs/users.stub";
import { Types } from "mongoose";

export class UpdateUserDtoStub extends UserDtoStub {
  _id: string;

  create(props: UpdateUserDto = {
    name: 'NewName',
    email: 'new@email.com',
    _id: userDocumentStub()._id.toString(),
  }) {
    const { _id, ...updateProps } = props as UpdateUserDto;
    this._id = _id;
    super.create(updateProps as CreateUserDto);
  }

  withObjectId(id: string) {
    this._id = id;
    return this;
  }
}
