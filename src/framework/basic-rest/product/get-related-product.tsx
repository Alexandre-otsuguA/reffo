import { useQuery } from 'react-query';
import {
  ProductsQueryOptionsType,
  ProductsQueryResponse,
} from '@framework/basic-rest/types';
import http from '@framework/basic-rest/utils/http';
import { API_ENDPOINTS } from '@framework/basic-rest/utils/api-endpoints';
import { filterData } from '../utils/data';

export const fetchRelatedProducts = async ({ queryKey }: any) => {
  const [_key, params] = queryKey as [string, ProductsQueryOptionsType];
  const res = await http.get(API_ENDPOINTS.PRODUCTS);
  return filterData(res.data, params) as ProductsQueryResponse;
};
export const useRelatedProductsQuery = (options: ProductsQueryOptionsType) => {
  return useQuery<ProductsQueryResponse, Error>(
    [API_ENDPOINTS.PRODUCTS, options],
    fetchRelatedProducts
  );
};
