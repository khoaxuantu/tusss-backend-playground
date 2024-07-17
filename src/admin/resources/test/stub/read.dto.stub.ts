import { RESOURCE_READ_TYPE } from '../../constant/common';
import { AbstractResourceReadDto } from '../../dto/read.dto';

export const resourceListDtoStub = (override?: Record<string, any>): AbstractResourceReadDto => {
  return {
    read_type: RESOURCE_READ_TYPE.LIST,
    _order: '',
    _end: 20,
    _sort: '',
    _start: 10,
    ...override,
  };
};

export const ResourceManyDtoStub = (override?: Record<string, any>): AbstractResourceReadDto => {
  return {
    read_type: RESOURCE_READ_TYPE.MANY,
    ...override,
  };
};
