import Layout from '@components/layout/layout';
import Container from '@components/ui/container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { aboutSetting } from '@settings/about-setting';
import Seo from '@components/seo/seo';

const backgroundThumbnail =
  'https://images.unsplash.com/photo-1519155031214-e8d583928bf2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';

export default function TermsPage() {
  const { t } = useTranslation('about');
  return (
    <>
      <Seo title="About Us" description="" path="about-us" />
      {/* End of seo */}
      <div
        className="flex justify-center h-[250px] lg:h-96 2xl:h-[500px] w-full bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${backgroundThumbnail})`,
        }}
      ></div>
      <div className="py-8 lg:py-16 2xl:py-20">
        <Container>
          <div className="flex flex-col w-full mx-auto max-w-[1200px]">
            <h2 className="text-lg md:text-xl lg:text-[24px] text-skin-base font-semibold mb-4 lg:mb-7">
              {t(aboutSetting.titleOne)}
            </h2>
            <div
              className="text-skin-base opacity-70 text-sm leading-7 lg:text-15px lg:leading-loose"
              dangerouslySetInnerHTML={{
                __html: t(aboutSetting.descriptionOne),
              }}
            />
            <br />
            <div
              className="text-skin-base opacity-70 text-sm leading-7 lg:text-15px lg:leading-loose"
              dangerouslySetInnerHTML={{
                __html: t(aboutSetting.descriptionTwo),
              }}
            />
            <br />
            <div
              className="text-skin-base opacity-70 text-sm leading-7 lg:text-15px lg:leading-loose"
              dangerouslySetInnerHTML={{
                __html: t(aboutSetting.descriptionThree),
              }}
            />
            <br />
            <div
              className="text-skin-base opacity-70 text-sm leading-7 lg:text-15px lg:leading-loose"
              dangerouslySetInnerHTML={{
                __html: t(aboutSetting.descriptionFour),
              }}
            />
          </div>
        </Container>
      </div>
    </>
  );
}

TermsPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'about',
        'footer',
      ])),
    },
  };
};
