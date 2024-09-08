import { Role } from '@/auth/constant/role.constant';
import { User, UserDocument } from '@/user/schema/user.schema';
import { Types } from 'mongoose';

export const userStub = (pwd?: string): User => {
  return {
    name: 'Tusss',
    email: 'tusss@Tusss.com',
    password: pwd ?? 'Uv7`aa%aa9aaaaaaaafdaaasabac&aaa',
    age: 23,
    nationality: 'Vietnam',
    city: 'Hanoi',
    address: 'No. 123 Something street, Unknown district',
    phone_number: '0123456789',
    roles: [Role.User],
  } as User;
};

export const userDocumentStub: () => UserDocument = () => {
  return {
    _id: new Types.ObjectId('662f2045d274587dc7a99ad8'),
    ...userStub(),
  } as UserDocument;
};

export const userDocumentNoIdStub: () => UserDocument = () => {
  return {
    ...userStub(),
  } as UserDocument;
};

export const userToClientStub = () => {
  const user = { ...userDocumentNoIdStub(), password: undefined };
  return user as UserDocument;
};
