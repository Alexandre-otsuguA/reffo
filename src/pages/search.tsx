import { useRouter } from 'next/router';
import Container from '@components/ui/container';
import Layout from '@components/layout/layout';
import { ShopFilters } from '@components/search/filters';
import { ProductGrid } from '@components/product/product-grid';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { Element } from 'react-scroll';
import SearchTopBar from '@components/search/search-top-bar';
import Divider from '@components/ui/divider';
import Seo from '@components/seo/seo';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { API_ENDPOINTS } from '@framework/basic-rest/utils/api-endpoints';
import { fetchCategories } from '@framework/basic-rest/category/get-all-categories';
import {
  fetchProducts,
  useProductsQuery,
} from '@framework/basic-rest/product/get-all-products';
import { LIMITS } from '@framework/basic-rest/utils/limits';

export default function Search() {
  const router = useRouter();
  const query = useProductsQuery(router.asPath, {
    limit: LIMITS.PRODUCTS_LIMITS,
    ...router.query,
  });

  return (
    <>
      <Seo title="Search" description="" path="search" />
      <Divider />
      <Container>
        <Element name="grid" className="flex pt-7 lg:pt-11 pb-16 lg:pb-20">
          <div className="flex-shrink-0 pe-8 xl:pe-16 hidden lg:block w-80 xl:w-96 sticky top-16 h-full">
            <ShopFilters />
          </div>
          <div className="w-full lg:-ms-2 xl:-ms-8 lg:-mt-1">
            <SearchTopBar {...query} />
            <ProductGrid {...query} />
          </div>
        </Element>
      </Container>
    </>
  );
}

Search.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.CATEGORIES, { limit: LIMITS.CATEGORIES_LIMITS }],
    fetchCategories
  );
  await queryClient.prefetchInfiniteQuery(
    [API_ENDPOINTS.PRODUCTS, { limit: LIMITS.PRODUCTS_LIMITS }],
    fetchProducts
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
    revalidate: 60,
  };
};
