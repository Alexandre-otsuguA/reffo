import Layout from '@components/layout/layout';
import Container from '@components/ui/container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import DownloadApps from '@components/common/download-apps';
import { aboutSetting } from '@settings/about-setting';
import Image from '@components/ui/image';
import Seo from '@components/seo/seo';

const backgroundThumbnail =
  'https://images.unsplash.com/photo-1519155031214-e8d583928bf2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';
const aboutUs1 =
  'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80';
const aboutUs2 =
  'https://images.unsplash.com/photo-1618764400608-9e7115eede74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';
const aboutUs3 =
  'https://images.unsplash.com/photo-1573739022854-abceaeb585dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';
const aboutUs4 =
  'https://images.unsplash.com/photo-1529346720291-0c190cc4c804?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1314&q=80';
const aboutUs5 =
  'https://images.unsplash.com/photo-1499914845977-69a48b1aea28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80';
const aboutUs6 =
  'https://images.unsplash.com/photo-1472148439583-1f4cf81b80e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80';

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

            <div className="grid my-8 lg:my-14 grid-cols-2 gap-4">
              <Image
                src={aboutUs1}
                alt={t('text-map')}
                className=" me-5"
                width={576}
                height={390}
              />
              <Image
                src={aboutUs2}
                alt={t('text-map')}
                className=""
                width={576}
                height={390}
              />
            </div>
            <div
              className="text-skin-base opacity-70 text-sm leading-7 lg:text-15px lg:leading-loose"
              dangerouslySetInnerHTML={{
                __html: t(aboutSetting.descriptionTwo),
              }}
            />
            <div className="my-8 lg:my-14 flex flex-col sm:grid grid-cols-3 gap-4">
              <Image
                src={aboutUs3}
                alt={t('text-map')}
                className=" me-4"
                width={379}
                height={262}
              />
              <Image
                src={aboutUs4}
                alt={t('text-map')}
                className=" me-4"
                width={379}
                height={262}
              />
              <Image
                src={aboutUs5}
                alt={t('text-map')}
                className=" "
                width={379}
                height={262}
              />
            </div>
            <div
              className="text-skin-base opacity-70 text-sm leading-7 lg:text-15px lg:leading-loose"
              dangerouslySetInnerHTML={{
                __html: t(aboutSetting.descriptionThree),
              }}
            />
            <div className="flex mt-8 lg:mt-14 mb-6 lg:mb-10">
              <Image
                src={aboutUs6}
                alt={t('text-map')}
                className=" me-4"
                height={400}
                width={1200}
              />
            </div>
            <h2 className="text-lg md:text-xl lg:text-[24px] text-skin-base font-semibold mb-4 lg:mb-7">
              {t(aboutSetting.titleTwo)}
            </h2>
            <div
              className="text-skin-base opacity-70 text-sm leading-7 lg:text-15px lg:leading-loose"
              dangerouslySetInnerHTML={{
                __html: t(aboutSetting.descriptionFour),
              }}
            />
          </div>
        </Container>
      </div>

      <DownloadApps />
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
