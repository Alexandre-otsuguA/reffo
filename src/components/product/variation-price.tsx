import usePrice from '@framework/basic-rest/product/use-price';
import { Variation } from '@framework/basic-rest/types';
import { siteSettings } from '@settings/site-settings';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';

type Props = {
  selectedVariation?: Variation['options'][0];
  minPrice?: number;
  maxPrice?: number;
};

export default function VariationPrice({
  selectedVariation,
  minPrice,
  maxPrice,
}: Props) {
  const { t } = useTranslation('common');
  const { price, basePrice, discount } = usePrice(
    selectedVariation && {
      amount: selectedVariation.price,
      baseAmount: selectedVariation.price,
      currencyCode: siteSettings.currencyCode,
    }
  );
  const { price: min_price } = usePrice({
    amount: minPrice!,
    currencyCode: siteSettings.currencyCode,
  });
  const { price: max_price } = usePrice({
    amount: maxPrice!,
    currencyCode: siteSettings.currencyCode,
  });
  return (
    <div className="flex items-center mt-5">
      <div className="text-skin-base font-bold text-base md:text-xl xl:text-[22px]">
        {!isEmpty(selectedVariation)
          ? `${price}`
          : `${min_price} - ${max_price}`}
      </div>
      {discount && (
        <>
          <del className="text-sm md:text-15px ps-3 text-skin-base text-opacity-50">
            {basePrice}
          </del>
          <span className="inline-block rounded font-bold text-xs md:text-sm bg-skin-tree bg-opacity-20 text-skin-tree uppercase px-2 py-1 ms-2.5">
            {discount} {t('text-off')}
          </span>
        </>
      )}
    </div>
  );
}
