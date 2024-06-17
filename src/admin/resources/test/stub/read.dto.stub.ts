import { ResourceReadDto } from '../../dto/read.dto';

type ResourceDtoStub = Partial<ResourceReadDto> & Record<string, any>;

export const resourceListDtoStub = (override?: ResourceDtoStub): ResourceDtoStub => {
  return {
    read_type: 'list',
    _order: '',
    _end: 20,
    _sort: '',
    _start: 10,
    ...override,
  };
};

export const ResourceManyDtoStub = (override?: ResourceDtoStub): ResourceDtoStub => {
  return {
    read_type: 'many',
    ...override,
  };
};
