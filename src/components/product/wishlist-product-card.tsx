import type { FC } from 'react';
import { useRouter } from 'next/router';
import Image from '@components/ui/image';
import usePrice from '@framework/basic-rest/product/use-price';
import { Product } from '@framework/basic-rest/types';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { useTranslation } from 'next-i18next';
import { siteSettings } from '@settings/site-settings';
import useWishlistToogle from '@framework/idb/wishlist/toogle-product';
import useToast from '@utils/use-toast';
import { ROUTES } from '@utils/routes';

interface ProductProps {
  product: Product;
  className?: string;
}

const WishlistProductCard: FC<ProductProps> = ({ product }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { name, gallery, unit } = product ?? {};
  const placeholderImage = `/assets/placeholder/product.svg`;
  const toast = useToast();
  const { isFavorite, mutate: toggleWishlist } = useWishlistToogle({
    slug: product.slug,
    onSuccess: () =>
      toast(isFavorite ? t('text-remove-favorite') : t('text-added-favorite')),
    onError: ({ message }) => toast(message, { status: 'error' }),
  });
  const { price, basePrice, discount } = usePrice({
    amount: product.price,
    baseAmount: product.price,
    currencyCode: siteSettings.currencyCode,
  });

  function navigateToProductPage() {
    router.push(
      `${ROUTES.PRODUCT}/${product.slug}?category=${product.category}`
    );
  }

  return (
    <div
      className="flex flex-col md:flex-row border-b border-skin-base py-4 2xl:py-5 wishlist-card last:pb-0 first:-mt-8 lg:first:-mt-4 2xl:first:-mt-7 cursor-pointer"
      onClick={navigateToProductPage}
    >
      <div className="flex ">
        <div className="relative flex-shrink-0 mt-1">
          <div className="flex overflow-hidden max-w-[80px]  transition duration-200 ease-in-out transform group-hover:scale-105">
            <Image
              src={gallery[0]?.thumbnail ?? placeholderImage}
              alt={name || 'Product Image'}
              width={80}
              height={80}
              quality={100}
              className="object-cover bg-skin-thumbnail"
            />
          </div>
        </div>

        <div className="flex flex-col ms-2 2xl:ms-3.5 h-full">
          <h2 className="text-skin-base text-13px sm:text-sm lg:text-15px leading-5 sm:leading-6 mb-1.5">
            {name}
          </h2>
          <div className="text-13px sm:text-sm mb-1 lg:mb-2">{unit}</div>
          <div className="space-s-2 ">
            <span className="inline-block font-semibold text-sm sm:text-15px lg:text-base text-skin-base">
              {price}
            </span>
            {discount && (
              <del className="text-sm text-skin-base text-opacity-50">
                {basePrice}
              </del>
            )}
          </div>
        </div>
      </div>
      <div
        className="ms-auto md:pt-7 flex cursor-pointer"
        onClick={ev => (ev.stopPropagation(), toggleWishlist(product))}
      >
        {isFavorite ? (
          <>
            <IoIosHeart className="text-skin-primary w-5 h-5 mt-0.5" />
            <span className="text-skin-primary ms-3 font-semibold text-15px -mt-0.5 md:mt-0">
              {t('text-favorited')}
            </span>
          </>
        ) : (
          <>
            <IoIosHeartEmpty className="w-5 h-5 mt-0.5" />
            <span className=" ms-3 text-skin-base font-medium text-15px -mt-0.5 md:mt-0">
              {t('text-favorite')}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistProductCard;
