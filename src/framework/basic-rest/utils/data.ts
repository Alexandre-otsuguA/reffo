import {
  Product,
  ProductsQueryOptionsType,
  ProductsQueryResponse,
} from '../types';
import * as ArrayUtils from '@utils/array';

export const sortProducts = (
  res: ProductsQueryResponse,
  { sort_by }: ProductsQueryOptionsType
) => {
  return {
    results: res.results,
    rows:
      sort_by === 'lowest'
        ? res.rows.sort((a, b) => a.price - b.price)
        : sort_by === 'highest'
        ? res.rows.sort((a, b) => b.price - a.price)
        : res.rows.reverse(),
  };
};

export const filterData = (
  data: Product[],
  params: ProductsQueryOptionsType
) => {
  (params.category || params.slug) &&
    (data = data.filter(
      item =>
        !!Object.keys(item).find(key =>
          // @ts-ignore
          params[key]?.includes(item[key])
        )
    ));

  return {
    results: data.length,
    rows: ArrayUtils.paginate(data, params),
  };
};

export const searchData = (
  data: Product[],
  params: ProductsQueryOptionsType
) => {
  data = data.filter(item =>
    new RegExp((params?.text as string).replaceAll(' ', ''), 'i').test(
      item.name.replaceAll(' ', '')
    )
  );
  return {
    results: data.length,
    rows: ArrayUtils.paginate(data, params),
  };
};
