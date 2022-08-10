import { useQuery } from 'react-query';
import { Product, ProductsQueryOptionsType } from '@framework/basic-rest/types';
import http from '@framework/basic-rest/utils/http';
import { API_ENDPOINTS } from '@framework/basic-rest/utils/api-endpoints';
import { filterData } from '../utils/data';

export const fetchProduct = async ({ queryKey }: any) => {
  const [_key, params] = queryKey as [string, ProductsQueryOptionsType];
  const res = await http.get<Product[]>(`${API_ENDPOINTS.PRODUCTS}`, {
    params,
  });
  return filterData(res.data, params as any).rows[0] as Product;
};
export const useProductQuery = (options: ProductsQueryOptionsType) => {
  return useQuery<Product, Error>(
    [API_ENDPOINTS.PRODUCTS, options],
    fetchProduct
  );
};
