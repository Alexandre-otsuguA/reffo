import {
  ProductsQueryResponse,
  QueryOptionsType,
} from '@framework/basic-rest/types';
import http from '@framework/basic-rest/utils/http';
import { API_ENDPOINTS } from '@framework/basic-rest/utils/api-endpoints';
import { useQuery } from 'react-query';
import { searchData } from '../utils/data';
import { LIMITS } from '../utils/limits';

export const fetchSearchedProducts = async ({ queryKey }: any) => {
  const [_key, params] = queryKey;
  const res = params.text
    ? await http.get(API_ENDPOINTS.PRODUCTS)
    : { data: [] };

  return searchData(res.data, {
    limit: LIMITS.SEARCH_PRODUCTS_LIMITS,
    ...params,
  });
};
export const useSearchQuery = (options: QueryOptionsType) => {
  return useQuery<ProductsQueryResponse, Error>(
    [API_ENDPOINTS.PRODUCTS, options],
    fetchSearchedProducts
  );
};
