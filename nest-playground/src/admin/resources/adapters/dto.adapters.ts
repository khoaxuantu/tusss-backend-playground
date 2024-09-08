import { FilterProps } from '@/lib/repository/interfaces/repository.interface';
import { FilterQuery } from 'mongoose';
import { AbstractResourceReadDto, ResourcePaginateDto } from '../dto/read.dto';

type ParsePaginateProps = Omit<FilterProps<any>, 'match'>;
type ParseFilterProps = FilterQuery<any>;

export interface GetListDtoAdapterResProps {
  paginateParams: ParsePaginateProps;
  filterParams: ParseFilterProps;
}

export class GetListDtoAdapter {
  static parse(query: AbstractResourceReadDto): GetListDtoAdapterResProps {
    const { read_type, page, limit, sort, order, ...filterParams } = query;
    return {
      paginateParams: this.parsePaginate({ page, limit, sort, order }),
      filterParams: filterParams["filter"],
    };
  }

  private static parsePaginate(props: ResourcePaginateDto): ParsePaginateProps {
    const result: ParsePaginateProps = {
      sort: {},
      page: props.page ?? 1,
      limit: props.limit ?? 10,
    };

    props.sort?.forEach((prop, index) => {
      result.sort[prop] = props.order[index] == 'desc' ? -1 : 1;
    });

    if (!Object.keys(props.sort ?? 0).length) result.sort = { _id: 1 };

    return result;
  }
}

export class GetManyDtoAdapter {
  static parse(query: AbstractResourceReadDto): string[] {
    return query.ids;
  }
}
