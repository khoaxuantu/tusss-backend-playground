import { FilterProps } from '@/lib/repository/interfaces/repository.interface';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ResourceReadDto } from '../dto/read.dto';
import { RESOURCE_READ_TYPE } from '../constant/common';
import { GetListDtoAdapter, GetManyDtoAdapter } from '../adapters/dto.adapters';
import { InvalidParamsException } from '@/lib/exception/invalid-param.exception';
import { printDeepObject } from '@/lib/helper/print.helper';

type ParsePaginateProps = Omit<FilterProps<any>, 'match'>;
type ParseFilterProps = Record<string, any>;

interface ListQueryProps {
  paginateParams: ParsePaginateProps;
  filterParams: ParseFilterProps;
}

@Injectable()
export class ParseListQueryPipe
  implements PipeTransform<ResourceReadDto, ListQueryProps | string[]>
{
  transform(value: ResourceReadDto, metadata: ArgumentMetadata): ListQueryProps | string[] {
    printDeepObject(value, ParseListQueryPipe.name);
    switch (value.read_type) {
      case RESOURCE_READ_TYPE.LIST:
        return GetListDtoAdapter.parse(value);
      case RESOURCE_READ_TYPE.MANY:
        return GetManyDtoAdapter.parse(value);
      default:
        throw new InvalidParamsException({
          params: ["read_type"],
          where: ParseListQueryPipe.name,
        });
    }
  }
}
