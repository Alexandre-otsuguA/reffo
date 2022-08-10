import { useQuery } from 'react-query';
import { WishListProduct } from '../types';
import { ProductsQueryOptionsType } from '@framework/basic-rest/types';
import db from '../utils/db';

export const getAllWishlistProducts = async () => {
  const data = await db.getAllData({ table: 'wishlist' });
  return data;
};
export const useWishlistProductsQuery = (options: ProductsQueryOptionsType) => {
  return useQuery<WishListProduct[], Error>([options], getAllWishlistProducts);
};
