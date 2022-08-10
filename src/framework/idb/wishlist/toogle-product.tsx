import { useLayoutEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { WishListProduct } from '../types';
import { getWishlistProduct } from './get-product';
import db from '../utils/db';

export default function useWishlistToogle(params: {
  slug: WishListProduct['slug'];
  onSuccess: (ev: WishListProduct) => void;
  onError: (ev: { message: string }) => void;
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  useLayoutEffect(() => {
    getWishlistProduct(params).then(data => setIsFavorite(!!data));
  }, []);

  return {
    isFavorite,
    ...useMutation(
      async (product: WishListProduct) => {
        isFavorite
          ? await db.removeData({
              table: 'wishlist',
              pkey: product.slug,
            })
          : await db.writeData({ table: 'wishlist', content: product });

        setIsFavorite(pv => !pv);
        return product;
      },
      {
        onSuccess: ev => params.onSuccess(ev),
        onError: message => (
          console.error(message),
          // @ts-ignore
          params.onError({ message })
        ),
      }
    ),
  };
}
