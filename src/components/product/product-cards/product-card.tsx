import { useRouter } from 'next/router';
import cn from 'classnames';
import Image from '@components/ui/image';
import usePrice from '@framework/basic-rest/product/use-price';
import { Product } from '@framework/basic-rest/types';
import { useTranslation } from 'next-i18next';
import { productPlaceholder } from '@assets/placeholders';
import { ROUTES } from '@utils/routes';
import { siteSettings } from '@settings/site-settings';

interface ProductProps {
  product: Product;
  className?: string;
}
const ProductCard: React.FC<ProductProps> = ({ product, className }) => {
  const router = useRouter();
  const { name, gallery, unit, variations, slug, category } = product ?? {};
  const { t } = useTranslation('common');
  const { price, basePrice, discount } = usePrice({
    amount: product?.price,
    baseAmount: product?.price,
    currencyCode: siteSettings.currencyCode,
  });
  const { price: minPrice } = usePrice({
    amount: product?.min_price ?? 0,
    currencyCode: siteSettings.currencyCode,
  });
  const { price: maxPrice } = usePrice({
    amount: product?.max_price ?? 0,
    currencyCode: siteSettings.currencyCode,
  });

  function navigateToProductPage() {
    router.push(`${ROUTES.PRODUCT}/${slug}?category=${category}`);
  }

  return (
    <article
      title={name}
      className={cn(
        'flex flex-col group overflow-hidden rounded-md cursor-pointer transition-all duration-300 shadow-card hover:shadow-cardHover relative h-full',
        className
      )}
      onClick={navigateToProductPage}
    >
      <div className="relative flex-shrink-0">
        <div className="flex overflow-hidden max-w-[230px] mx-auto transition duration-200 ease-in-out transform group-hover:scale-105 relative">
          <Image
            src={gallery[0]?.thumbnail ?? productPlaceholder}
            alt={name || 'Product Image'}
            width={230}
            height={200}
            quality={100}
            className="bg-skin-fill"
            objectFit="contain"
          />
        </div>
        <div className="w-full h-full absolute top-0 pt-2.5 md:pt-3.5 px-3 md:px-4 lg:px-[18px] z-10 -mx-0.5 sm:-mx-1">
          {discount && (
            <span className="text-[11px] md:text-xs font-bold text-skin-inverted uppercase inline-block bg-skin-primary rounded-full px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
              {t('text-on-sale')}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col px-3 md:px-4 lg:px-[18px] pb-5 lg:pb-6 lg:pt-1.5 h-full">
        <div className="space-s-2 mb-1 lg:mb-1.5">
          <span className="inline-block font-semibold text-sm sm:text-15px lg:text-base text-skin-base">
            {variations.length ? `${minPrice} - ${maxPrice}` : price}
          </span>
          {basePrice && (
            <del className="text-sm text-skin-base text-opacity-70">
              {basePrice}
            </del>
          )}
        </div>
        <h2
          className="text-skin-base text-13px sm:text-sm lg:text-15px leading-5 sm:leading-6 mb-1.5"
          style={{
            display: '-webkit-box',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            wordBreak: 'break-word',
            hyphens: 'auto',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {name}
        </h2>
        <div className="text-13px sm:text-sm mt-auto">{unit}</div>
      </div>
    </article>
  );
};

export default ProductCard;
