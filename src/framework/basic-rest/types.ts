import { QueryKey } from 'react-query';

export type CollectionsQueryOptionsType = {
  text?: string;
  collection?: string;
  status?: string;
  limit?: number;
};

export type CategoriesQueryOptionsType = {
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};
export type ProductsQueryOptionsType = {
  type?: string;
  text?: string;
  category?: string;
  status?: string;
  slug?: string;
  limit?: number;
  page?: number;
  sort_by?: 'lowest' | 'highest' | 'new-arrival';
};

export type QueryOptionsType = OptionalProps<{
  text: string;
  category: string;
  status: string;
  limit: number;
  slug: string;
}>;

export type QueryParamsType = {
  queryKey: QueryKey;
  pageParam?: string;
};
export type Attachment = {
  id: string | number;
  thumbnail: string;
  original: string;
};
export type Category = {
  id: number | string;
  name: string;
  slug: string;
  details?: string;
  image?: Attachment;
  icon?: string;
  children?: [Category];
  products?: Product[];
  productCount?: number;
  [key: string]: unknown;
};
export type Collection = {
  id: number | string;
  name: string;
  slug: string;
  details?: string;
  image?: Attachment;
  icon?: string;
  products?: Product[];
  productCount?: number;
};
export type Tag = {
  id: string | number;
  name: string;
};
export type Variation = {
  id: number | string;
  name: string;
  options: {
    id: number | string;
    name: string;
    price: number;
  }[];
};
export type Product = {
  id: number | string;
  name: string;
  slug: string;
  unit: string;
  order: string;
  price: number;
  min_price?: number;
  max_price?: number;
  gallery: Attachment[];
  category?: string;
  meta?: any[];
  brand?: string;
  description?: string;
  tags: Tag[];
  variations: Variation[];
  [key: string]: unknown;
};

export type ProductsQueryResponse = {
  results: number;
  rows: Product[];
};
