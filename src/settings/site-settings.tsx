import { PTFlag } from '@components/icons/language/PTFlag';

export const siteSettings = {
  name: 'Reffo',
  description: 'Lorem ipsum dolor set amed.',
  author: {
    name: 'Alexandre Augusto',
    websiteUrl: 'https://github.com/',
    address: '',
  },
  logo: {
    url: '/assets/images/logo.svg',
    alt: 'Reffo',
    href: '/',
    width: 100,
    height: 30,
  },
  defaultLanguage: 'pt',
  currencyCode: 'BRL',
  site_header: {
    menu: [
      {
        id: 2,
        path: '/search',
        label: 'menu-categories',
        subMenu: [
          {
            id: 1,
            path: '/search?category=celulares',
            label: 'menu-cell-phones',
          },
          {
            id: 2,
            path: '/search?category=iphones',
            label: 'menu-iphones',
          },
          {
            id: 3,
            path: '/search?category=notebooks',
            label: 'menu-notebooks',
          },
          {
            id: 4,
            path: '/search?category=tv-e-eletronicos',
            label: 'menu-tv-and-electronics',
          },
          {
            id: 5,
            path: '/search?category=games',
            label: 'menu-games',
          },
          {
            id: 6,
            path: '/search?category=eletroportateis',
            label: 'menu-small-appliances',
          },
          {
            id: 7,
            path: '/search?category=eletrodomesticos',
            label: 'menu-home-appliances',
          },
        ],
      },
      {
        id: 4,
        path: '/products/',
        label: 'menu-search',
      },
    ],
    languageMenu: [
      {
        id: 'pt',
        value: 'pt',
        name: 'Português - PT',
        icon: <PTFlag />,
      },
    ],
  },
};
