import { ApiProperty } from "@nestjs/swagger";

abstract class ApiResponseMessage {
  @ApiProperty()
  status: 'success' | 'failed';
}

export class SuccessApiResponseMessage<T> extends ApiResponseMessage {
  @ApiProperty()
  data?: T;

  @ApiProperty()
  message?: string;
}
