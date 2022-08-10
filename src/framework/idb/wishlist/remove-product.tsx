import { useMutation } from 'react-query';
import { WishListProduct } from '../types';
import db from '../utils/db';

export default function useWishlistRemove(params: {
  onSuccess: (ev: { product: WishListProduct }) => void;
  onError: (ev: { message: string }) => void;
}) {
  return useMutation(
    async (product: WishListProduct) => {
      await db.removeData({ table: 'wishlist', pkey: product.slug });
      return { product };
    },
    {
      onSuccess: ev => {
        params.onSuccess(ev);
      },
      onError: message => {
        console.error(message);
        // @ts-ignore
        params.onError({ message });
      },
    }
  );
}
