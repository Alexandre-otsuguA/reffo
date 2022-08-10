import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import useToast from '@utils/use-toast';
import useWishlistToogle from '@framework/idb/wishlist/toogle-product';
import { Product } from '@framework/basic-rest/types';
import Button from '@components/ui/button';

const AddToWishlist = ({ data }: { data?: Product }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const toast = useToast();

  const { isFavorite, mutate: toggleWishlist } = useWishlistToogle({
    slug: router.query.slug as string,
    onSuccess: () =>
      toast(isFavorite ? t('text-remove-favorite') : t('text-added-favorite')),
    onError: ({ message }) => toast(message, { status: 'error' }),
  });

  return (
    <Button
      variant="border"
      onClick={() => toggleWishlist(data as any)}
      className={`group hover:text-skin-primary ${
        isFavorite && 'text-skin-primary'
      }`}
    >
      {isFavorite ? (
        <IoIosHeart className="text-2xl md:text-[26px] me-2 transition-all" />
      ) : (
        <IoIosHeartEmpty className="text-2xl md:text-[26px] me-2 transition-all group-hover:text-skin-primary" />
      )}

      {t('text-wishlist')}
    </Button>
  );
};
export default AddToWishlist;
