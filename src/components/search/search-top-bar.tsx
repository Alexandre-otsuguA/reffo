import { Drawer } from '@components/common/drawer/drawer';
import FilterIcon from '@components/icons/filter-icon';
import { useUI } from '@contexts/ui.context';
import FilterSidebar from '@components/search/filter-sidebar';
import ListBox from '@components/ui/filter-list-box';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { getDirection } from '@utils/get-direction';
import { ProductsQueryResponse } from '@framework/basic-rest/types';
import { UseQueryResult } from 'react-query';

const SearchTopBar = ({
  isFetching,
  data,
}: UseQueryResult<ProductsQueryResponse, Error>) => {
  const { openFilter, displayFilter, closeFilter } = useUI();
  const { t } = useTranslation('common');
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const contentWrapperCSS = dir === 'ltr' ? { left: 0 } : { right: 0 };
  return (
    <div className="flex justify-between items-center mb-6">
      <button
        className="lg:hidden text-skin-base text-sm px-4 py-2 font-semibold border border-skin-base rounded-md flex items-center transition duration-200 ease-in-out focus:outline-none hover:border-skin-primary hover:text-skin-primary"
        onClick={openFilter}
      >
        <FilterIcon />
        <span className="ps-2.5">{t('text-filters')}</span>
      </button>
      <div className="flex w-full items-center justify-end lg:justify-between">
        <div className="flex-shrink-0 text-skin-base font-medium text-15px leading-4 md:me-6 hidden lg:block mt-0.5">
          {!isFetching &&
            (data?.results
              ? t('text-items-found')
                  .replace('%s', data.rows.length as unknown as string)
                  .replace('%s', data.results as unknown as string)
              : t('text-items-not-found'))}
        </div>
        <ListBox
          options={[
            { name: 'text-new-arrival', value: 'new-arrival' },
            { name: 'text-lowest-price', value: 'lowest' },
            { name: 'text-highest-price', value: 'highest' },
          ]}
        />
      </div>
      <Drawer
        placement={dir === 'rtl' ? 'right' : 'left'}
        open={displayFilter}
        onClose={closeFilter}
        handler={false}
        showMask={true}
        level={null}
        contentWrapperStyle={contentWrapperCSS}
      >
        <FilterSidebar {...data} />
      </Drawer>
    </div>
  );
};

export default SearchTopBar;
