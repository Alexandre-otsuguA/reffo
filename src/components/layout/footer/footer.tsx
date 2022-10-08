import Widgets from '@components/layout/footer/widget/widget';
import Copyright from '@components/layout/footer/copyright';
import { footer } from './data';
const { widgets } = footer;

const Footer: React.FC = () => (
  <footer className="mt-[50px] lg:mt-14 2xl:mt-16 border-t border-skin-three pt-6 lg:pt-7">
    <Widgets widgets={widgets} />
    <Copyright />
  </footer>
);

export default Footer;
