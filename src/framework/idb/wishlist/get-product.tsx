import { useQuery } from 'react-query';
import { WishListProduct } from '../types';
import db from '../utils/db';

type Options = { slug: WishListProduct['slug'] };

export const getWishlistProduct = async (options: Options) => {
  const data = await db.getData({ table: 'wishlist', pkey: options.slug });
  return data;
};
export const useWishlistProductQuery = (options: Options) => {
  return useQuery<WishListProduct[], Error>([], () =>
    getWishlistProduct(options)
  );
};
