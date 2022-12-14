import { NextSeo, NextSeoProps } from 'next-seo';

interface SeoProps extends NextSeoProps {
  path: string;
}

const Seo = ({ title, description, path }: SeoProps) => {
  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/${path}`,
        title,
        description,
        images: [
          {
            url: '/assets/images/og-image.png',
            width: 800,
            height: 600,
            alt: 'Pood',
          },
        ],
      }}
    />
  );
};

export default Seo;
