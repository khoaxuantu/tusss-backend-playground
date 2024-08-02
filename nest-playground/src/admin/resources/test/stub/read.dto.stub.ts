import { RESOURCE_READ_TYPE } from '../../constant/common';
import { AbstractResourceReadDto } from '../../dto/read.dto';

export const resourceListDtoStub = (
  override?: Partial<AbstractResourceReadDto>,
): AbstractResourceReadDto => {
  return {
    read_type: RESOURCE_READ_TYPE.LIST,
    order: [''],
    limit: 20,
    sort: [''],
    page: 10,
    ...override,
  } as AbstractResourceReadDto;
};

export const ResourceManyDtoStub = (
  override?: Partial<AbstractResourceReadDto>,
): AbstractResourceReadDto => {
  return {
    read_type: RESOURCE_READ_TYPE.MANY,
    ...override,
  };
};
