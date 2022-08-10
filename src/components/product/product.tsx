import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Button from '@components/ui/button';
import { ROUTES } from '@utils/routes';
import { useProductQuery } from '@framework/basic-rest/product/get-product';
import usePrice from '@framework/basic-rest/product/use-price';
import isEmpty from 'lodash/isEmpty';
import ThumbnailCarousel from '@components/ui/carousel/thumbnail-carousel';
import Image from '@components/ui/image';
import TagLabel from '@components/ui/tag-label';
import LabelIcon from '@components/icons/label-icon';
import { IoArrowRedoOutline } from 'react-icons/io5';
import SocialShareBox from '@components/ui/social-share-box';
import ProductDetailsTab from '@components/product/product-details/product-tab';
import VariationPrice from './variation-price';
import { siteSettings } from '@settings/site-settings';
import ProductVariations from './product-variations';
import { Variation } from '@framework/basic-rest/types';

const AddToWishlist = dynamic(() => import('./add-to-wishlist'), {
  ssr: false,
});

const ProductSingleDetails: React.FC = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const productUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${ROUTES.PRODUCT}/${router.query.slug}`;

  const { data, isLoading } = useProductQuery({
    slug: router.query.slug as string,
  });

  const [selectedVariation, setSelectedVariation] =
    useState<Variation['options'][0]>();
  const [shareButtonStatus, setShareButtonStatus] = useState(false);
  const { price, basePrice, discount } = usePrice(
    data && {
      amount: data.price,
      baseAmount: data.price,
      currencyCode: siteSettings.currencyCode,
    }
  );
  const handleChange = () => {
    setShareButtonStatus(!shareButtonStatus);
  };
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="pt-6 md:pt-7 pb-2">
      <div className="lg:grid grid-cols-10 gap-7 2xl:gap-8">
        <div className="col-span-5 xl:col-span-6 overflow-hidden mb-6 md:mb-8 lg:mb-0">
          {!!data?.gallery?.length ? (
            <ThumbnailCarousel
              gallery={data?.gallery}
              thumbnailClassName="xl:w-[700px] 2xl:w-[900px]"
              galleryClassName="xl:w-[150px] 2xl:w-[170px]"
            />
          ) : (
            <div className="w-auto flex items-center justify-center">
              <Image
                src={data?.gallery[0]?.original ?? '/product-placeholder.svg'}
                alt={data?.name!}
                width={900}
                height={680}
                objectFit="contain"
              />
            </div>
          )}
        </div>

        <div className="flex-shrink-0 flex flex-col col-span-5 xl:col-span-4 xl:ps-2">
          <div className="pb-3 lg:pb-5">
            <div className="md:mb-2.5 block -mt-1.5">
              <h2 className="text-skin-base text-lg md:text-xl xl:text-2xl font-medium transition-colors duration-300">
                {data?.name}
              </h2>
            </div>
            {data?.unit && isEmpty(data.variations) ? (
              <div className="text-sm md:text-15px font-medium">
                {data?.unit}
              </div>
            ) : (
              <VariationPrice
                selectedVariation={selectedVariation}
                minPrice={data?.min_price}
                maxPrice={data?.max_price}
              />
            )}

            {isEmpty(data?.variations) && (
              <div className="flex items-center mt-5">
                <div className="text-skin-base font-bold text-base md:text-xl xl:text-[22px]">
                  {price}
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
            )}
          </div>
          {data && (
            <ProductVariations
              selectedVariation={selectedVariation}
              list={data?.variations}
              setVariation={setSelectedVariation}
            />
          )}
          <div className="pt-1.5 lg:pt-3 xl:pt-4 space-y-2.5 md:space-y-3.5">
            <div className="grid grid-cols-2 gap-2.5">
              <AddToWishlist data={data} />
              <div className="relative group">
                <Button
                  variant="border"
                  className={`w-full hover:text-skin-primary ${
                    shareButtonStatus && 'text-skin-primary'
                  }`}
                  onClick={handleChange}
                >
                  <IoArrowRedoOutline className="text-2xl md:text-[26px] me-2 transition-all group-hover:text-skin-primary" />
                  {t('text-share')}
                </Button>
                <SocialShareBox
                  className={`absolute z-10 end-0 w-[300px] md:min-w-[400px] transition-all duration-300 ${
                    shareButtonStatus
                      ? 'visible opacity-100 top-full'
                      : 'opacity-0 invisible top-[130%]'
                  }`}
                  shareUrl={productUrl}
                />
              </div>
            </div>
          </div>
          {!!data?.tags?.length && (
            <ul className="pt-5 xl:pt-6">
              <li className="text-sm md:text-15px text-skin-base text-opacity-80 inline-flex items-center justify-center me-2 relative top-1">
                <LabelIcon className="me-2" /> {t('text-tags')}:
              </li>
              {data?.tags?.map((item: any) => (
                <li className="inline-block p-[3px]" key={`tag-${item.id}`}>
                  <TagLabel data={item} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <ProductDetailsTab details={data?.description} />
    </div>
  );
};

export default ProductSingleDetails;
