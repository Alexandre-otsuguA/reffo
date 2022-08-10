import CategoryListCardLoader from '@components/ui/loaders/category-list-card-loader';
import { useCategoriesQuery } from '@framework/basic-rest/category/get-all-categories';
import Alert from '@components/ui/alert';
import CategoryListCard from '@components/cards/category-list-card';
import Scrollbar from '@components/ui/scrollbar';
import cn from 'classnames';
import { ROUTES } from '@utils/routes';

interface CategoriesProps {
  className?: string;
  limit?: number;
}

const CategoryGridList: React.FC<CategoriesProps> = ({
  className = '',
  limit,
}) => {
  const { data, isLoading, error } = useCategoriesQuery({
    limit: limit,
  });

  return (
    <aside
      className={cn(
        'sticky top-22 h-full hidden xl:block bg-skin-fill',
        className
      )}
    >
      <div className="max-h-full overflow-hidden">
        <Scrollbar className="w-full h-full max-h-screen">
          <div className="rounded border border-skin-base">
            {error ? (
              <Alert message={error?.message} />
            ) : isLoading && !data ? (
              Array.from({ length: 18 }).map((_, idx) => {
                return (
                  <CategoryListCardLoader
                    key={`card-circle-${idx}`}
                    uniqueKey={`card-circle-${idx}`}
                  />
                );
              })
            ) : (
              data?.categories?.data?.map(category => (
                <CategoryListCard
                  key={`category--key-${category.id}`}
                  category={category}
                  href={{
                    pathname: ROUTES.SEARCH,
                    query: { category: category.slug },
                  }}
                  className="border-b border-skin-base last:border-b-0 transition hover:bg-skin-two"
                />
              ))
            )}
          </div>
        </Scrollbar>
      </div>
    </aside>
  );
};

export default CategoryGridList;
