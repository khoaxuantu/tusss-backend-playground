import { FilterProps } from '@/lib/repository/interfaces/repository.interface';
import { ResourcePaginateDto, ResourceReadDto } from '../dto/read.dto';
import { AdminResourceDtoAdapter } from '../interfaces/adapter.interface';

type ParsePaginateProps = Omit<FilterProps<any>, 'match'>;
type ParseFilterProps = Record<string, any>;

export class GetListDtoAdapter extends AdminResourceDtoAdapter {
  static override parse(query: ResourceReadDto): {
    paginateParams: ParsePaginateProps;
    filterParams: ParseFilterProps;
  } {
    const { read_type, _start, _end, _sort, _order, ...filterParams } = query;
    return {
      paginateParams: this.parsePaginate({ _start, _end, _sort, _order }),
      filterParams: filterParams["filter"],
    };
  }

  private static parsePaginate(props: ResourcePaginateDto): ParsePaginateProps {
    const sortArr = props._sort?.split(',');
    const orderArr = props._order?.split(',') as ('asc' | 'desc')[];
    const result: ParsePaginateProps = {
      sort: {},
      skip: props._start ? props._start - 1 : 0,
      limit: props._start >= 0 && props._end > props._start ? props._end - props._start + 1 : 10,
    };

    sortArr?.forEach((prop, index) => {
      result.sort[prop] = orderArr[index] == 'desc' ? -1 : 1;
    });

    return result;
  }
}

export class GetManyDtoAdapter extends AdminResourceDtoAdapter {
  static override parse(query: ResourceReadDto): string[] {
    return query.ids;
  }
}
