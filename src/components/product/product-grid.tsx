import type { FC } from 'react';
import { useRouter } from 'next/router';
import Alert from '@components/ui/alert';
import ProductCard from '@components/product/product-cards/product-card';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import cn from 'classnames';
import { LIMITS } from '@framework/basic-rest/utils/limits';
import { Product, ProductsQueryResponse } from '@framework/basic-rest/types';
import Pagination from '@components/ui/pagination';
import * as route from '@utils/route';
import { UseQueryResult } from 'react-query';

type Props = {
  className?: string;
} & UseQueryResult<ProductsQueryResponse, Error>;

export const ProductGrid: FC<Props> = ({
  className = '',
  isFetching,
  data,
  error,
}) => {
  const router = useRouter();
  return (
    <>
      <div
        className={cn(
          'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-3 md:gap-4 2xl:gap-5',
          className
        )}
      >
        {error ? (
          <div className="col-span-full">
            <Alert message={error?.message} />
          </div>
        ) : isFetching && !data?.results ? (
          Array.from({ length: 30 }).map((_, idx) => (
            <ProductCardLoader
              key={`product--key-${idx}`}
              uniqueKey={`product--key-${idx}`}
            />
          ))
        ) : (
          data?.rows?.map((product: Product) => (
            <ProductCard key={`product--key-${product.id}`} product={product} />
          ))
        )}
      </div>
      {data && LIMITS.PRODUCTS_LIMITS < data.results && (
        <div className="pt-8 xl:pt-10">
          <Pagination
            total={data.results}
            current={+(router.query.page || 1)}
            pageSize={LIMITS.PRODUCTS_LIMITS}
            onChange={page => router.push(route.append(router, { page }))}
          />
        </div>
      )}
    </>
  );
};
