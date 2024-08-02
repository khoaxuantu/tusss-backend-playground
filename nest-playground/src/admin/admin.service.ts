import { AdminRepository } from "@/lib/repository/admin/admin.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AdminService {
  constructor(private readonly adminRepository: AdminRepository) {}

  getOneByEmail(email: string) {
    return this.adminRepository.findOne({ email }, { __v: 0 });
  }
}
