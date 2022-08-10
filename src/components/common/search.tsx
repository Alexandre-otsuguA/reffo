import React, { useState } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { useSearchQuery } from '@framework/basic-rest/product/use-search';
import SearchBox from '@components/common/search-box';
import SearchProduct from '@components/common/search-product';
import useFreezeBodyScroll from '@utils/use-freeze-body-scroll';
import Scrollbar from '@components/ui/scrollbar';
import { useUI } from '@contexts/ui.context';
import useDebounce from '@utils/use-debounce';

type Props = {
  className?: string;
  searchId?: string;
  variant?: 'border' | 'fill';
};

const Search = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      className = 'md:w-[730px] 2xl:w-[800px]',
      searchId = 'search',
      variant = 'border',
    },
    ref
  ) => {
    const {
      displayMobileSearch,
      closeMobileSearch,
      displaySearch,
      closeSearch,
    } = useUI();
    const router = useRouter();
    const [inputFocus, setInputFocus] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSetSearchText = useDebounce(setSearchTerm, 400);
    const { data } = useSearchQuery({
      text: searchTerm,
    });

    useFreezeBodyScroll(inputFocus || displaySearch || displayMobileSearch);

    function handleSearch(e: React.SyntheticEvent) {
      e.preventDefault();
      router.push(`/search?text=${searchTerm}`);
    }
    function handleAutoSearch(e: React.FormEvent<HTMLInputElement>) {
      const term = e.currentTarget.value.trim();
      term
        ? (data?.results && searchTerm.includes(term)) ||
          debouncedSetSearchText(term)
        : setSearchTerm('');
    }
    function clear() {
      setSearchTerm('');
      setInputFocus(false);
      closeMobileSearch();
      closeSearch();
    }
    function enableInputFocus() {
      setInputFocus(true);
    }

    return (
      <div
        ref={ref}
        className={cn(
          'w-full transition-all duration-200 ease-in-out',
          className
        )}
      >
        <div
          className={cn('overlay cursor-pointer', {
            open: displayMobileSearch,
            'input-focus-overlay-open': inputFocus,
            'open-search-overlay': displaySearch,
          })}
          onClick={clear}
        />
        {/* End of overlay */}

        <div className="w-full flex flex-col justify-center flex-shrink-0 relative z-30">
          <div className="flex flex-col mx-auto w-full">
            <SearchBox
              searchId={searchId}
              name="search"
              onSubmit={handleSearch}
              onChange={handleAutoSearch}
              onClear={clear}
              onFocus={enableInputFocus}
              variant={variant}
              value={searchTerm}
            />
          </div>
          {/* End of searchbox */}

          {data?.results !== 0 && searchTerm && (
            <div className="w-full absolute top-[56px] start-0 py-2.5 bg-skin-fill rounded-md flex flex-col overflow-hidden shadow-dropDown z-30">
              <Scrollbar className="os-host-flexbox">
                <div className="w-full">
                  {data?.rows.map((item, index) => (
                    <div
                      key={`search-result-key-${index}`}
                      className="py-2.5 ps-5 pe-10 scroll-snap-align-start transition-colors duration-200 hover:bg-skin-two"
                      onClick={clear}
                    >
                      <SearchProduct item={item} key={index} />
                    </div>
                  ))}
                </div>
              </Scrollbar>
            </div>
          )}
          {/* End of search result */}
        </div>
      </div>
    );
  }
);

export default Search;
