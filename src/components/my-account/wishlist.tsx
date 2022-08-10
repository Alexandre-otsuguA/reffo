import dynamic from 'next/dynamic';
import Layout from '@components/layout/layout';

const ProductWishlistGrid = dynamic(
  () => import('@components/product/wishlist-product'),
  { ssr: false }
);

export default function Wishlist() {
  return (
    <div className="flex flex-col pt-8 2xl:pt-12">
      <ProductWishlistGrid />
    </div>
  );
}

Wishlist.Layout = Layout;
