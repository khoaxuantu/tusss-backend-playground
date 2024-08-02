import { NotImplementedException } from "@nestjs/common";

export abstract class AdminResourceDtoAdapter {
  static parse(query: Record<string, any>): Record<string, any> {
    throw new NotImplementedException("AdminResourceDtoAdapter.parse() must be implemented");
  }
}
