import { NextRouter } from 'next/router';
import { isEmpty } from 'lodash';

export const append = (
  router: NextRouter,
  query: { [key: string]: string | number }
) => {
  const querString = Object.entries({ ...router.query, ...query })
    .map(item => item.join('='))
    .join('&');

  return [router.pathname, querString].join(
    router.asPath.includes('?') || isEmpty(router.query) ? '?' : '&'
  );
};
