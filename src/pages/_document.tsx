import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { i18n } from 'next-i18next';
import { getDirection } from '@utils/get-direction';

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return Document.getInitialProps(ctx);
  }
  render() {
    const { locale } = this.props.__NEXT_DATA__;
    if (process.env.NODE_ENV !== 'production') {
      i18n!.reloadResources(locale);
    }
    return (
      <Html dir={getDirection(locale)}>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600&display=swap"
            rel="stylesheet"
          />
          <script
            src="//instant.page/5.1.1"
            type="module"
            integrity="sha384-MWfCL6g1OTGsbSwfuMHc8+8J2u71/LA8dzlIN3ycajckxuZZmF+DNjdm7O6H3PSq"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
