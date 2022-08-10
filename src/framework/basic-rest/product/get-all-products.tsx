import {
  ProductsQueryOptionsType,
  ProductsQueryResponse,
} from '@framework/basic-rest/types';
import { API_ENDPOINTS } from '@framework/basic-rest/utils/api-endpoints';
import http from '@framework/basic-rest/utils/http';
import { useQuery } from 'react-query';
import { filterData, searchData, sortProducts } from '../utils/data';

const fetchProducts = async ({ queryKey }: any) => {
  const [_key, params] = queryKey;
  const res = await http.get(API_ENDPOINTS.PRODUCTS);
  return sortProducts(
    filterData(
      params.text ? searchData(res.data, params).rows : res.data,
      params
    ),
    params
  );
};

const useProductsQuery = (path: string, options: ProductsQueryOptionsType) => {
  return useQuery<ProductsQueryResponse, Error>([path, options], fetchProducts);
};

export { useProductsQuery, fetchProducts };
