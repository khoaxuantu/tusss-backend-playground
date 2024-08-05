import { FilterProps } from '@/lib/repository/interfaces/repository.interface';
import { AbstractResourceReadDto, ResourcePaginateDto } from '../dto/read.dto';
import { AdminResourceDtoAdapter } from '../interfaces/adapter.interface';
import { FilterQuery } from 'mongoose';

type ParsePaginateProps = Omit<FilterProps<any>, 'match'>;
type ParseFilterProps = FilterQuery<any>;

export interface GetListDtoAdapterResProps {
  paginateParams: ParsePaginateProps;
  filterParams: ParseFilterProps;
}

export class GetListDtoAdapter extends AdminResourceDtoAdapter {
  static override parse(query: AbstractResourceReadDto): GetListDtoAdapterResProps {
    const { read_type, page, limit, sort, order, ...filterParams } = query;
    return {
      paginateParams: this.parsePaginate({ page, limit, sort, order }),
      filterParams: filterParams["filter"],
    };
  }

  private static parsePaginate(props: ResourcePaginateDto): ParsePaginateProps {
    const result: ParsePaginateProps = {
      sort: {},
      skip: ((props.page ?? 1) - 1) * (props.limit ?? 10),
      limit: props.limit ?? 10,
    };

    props.sort?.forEach((prop, index) => {
      result.sort[prop] = props.order[index] == 'desc' ? -1 : 1;
    });

    if (!Object.keys(props.sort ?? 0).length) result.sort = { _id: 1 };

    return result;
  }
}

export class GetManyDtoAdapter extends AdminResourceDtoAdapter {
  static override parse(query: AbstractResourceReadDto): string[] {
    return query.ids;
  }
}
