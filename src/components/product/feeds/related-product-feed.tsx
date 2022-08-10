import ProductsCarousel from '@components/product/products-carousel';
import { useRelatedProductsQuery } from '@framework/basic-rest/product/get-related-product';
import { LIMITS } from '@framework/basic-rest/utils/limits';
import { useRouter } from 'next/router';

interface RelatedProductsProps {
  carouselBreakpoint?: {} | any;
  className?: string;
  uniqueKey?: string;
}

const RelatedProductFeed: React.FC<RelatedProductsProps> = ({
  carouselBreakpoint,
  className,
  uniqueKey = 'related-product-popup',
}) => {
  const { query } = useRouter();
  const { data, isLoading, error } = useRelatedProductsQuery({
    limit: LIMITS.RELATED_PRODUCTS_LIMITS,
    category: query.category as string,
  });
  return (
    <ProductsCarousel
      sectionHeading="text-related-products"
      categorySlug={`/search?category=${query.category}`}
      className={className}
      products={data?.rows}
      loading={isLoading}
      error={error?.message}
      limit={LIMITS.RELATED_PRODUCTS_LIMITS}
      uniqueKey={uniqueKey}
      carouselBreakpoint={carouselBreakpoint}
    />
  );
};

export default RelatedProductFeed;
