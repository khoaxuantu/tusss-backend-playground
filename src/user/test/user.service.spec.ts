import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { CommonUserFactory } from '@/lib/factory/user/common_user';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, CommonUserFactory],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
