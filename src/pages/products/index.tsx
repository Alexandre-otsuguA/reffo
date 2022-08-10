import { useRouter } from 'next/router';
import Container from '@components/ui/container';
import Layout from '@components/layout/layout';
import { ShopFilters } from '@components/search/filters';
import { ProductGrid } from '@components/product/product-grid';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DownloadApps from '@components/common/download-apps';
import { GetStaticProps } from 'next';
import SearchTopBar from '@components/search/search-top-bar';
import { Element } from 'react-scroll';
import Seo from '@components/seo/seo';
import Divider from '@components/ui/divider';
import { useProductsQuery } from '@framework/basic-rest/product/get-all-products';
import { LIMITS } from '@framework/basic-rest/utils/limits';

export default function Products() {
  const router = useRouter();
  const query = useProductsQuery(router.asPath, {
    limit: LIMITS.PRODUCTS_LIMITS,
    ...router.query,
  });

  return (
    <>
      <Seo title="Products" description="" path="products" />
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
      <DownloadApps />
    </>
  );
}

Products.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
