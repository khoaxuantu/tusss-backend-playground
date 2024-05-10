import { User, UserDocument } from '@/user/schema/user.schema';

type AllUser = User;
type AllUserDocument = UserDocument;

export interface UserFactory {
  create: <T extends AllUser>(user: T) => AllUserDocument;
}
