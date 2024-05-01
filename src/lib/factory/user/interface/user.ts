import { User, UserDocument } from '@/models/mongodb/user.schema';

type AllUser = User;
type AllUserDocument = UserDocument;

export interface UserFactory {
  create: <T extends AllUser>(user: T) => AllUserDocument;
}
