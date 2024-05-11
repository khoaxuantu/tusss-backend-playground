import { User, UserDocument } from '@/user/schema/user.schema';
import { Types } from 'mongoose';

export const userStub = (pwd?: string): User => {
  return {
    name: 'Tusss',
    email: 'tusss@Tusss.com',
    password: pwd ?? 'Uv7`aa%aa9aaaaaaaafdaaasabac&aaa',
    age: 23,
    joined_date: new Date('2024-05-01T05:01:57.230Z'),
  };
};

export const userToClientStub = () => {
  const { password, ...user } = userStub();
  return user;
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
