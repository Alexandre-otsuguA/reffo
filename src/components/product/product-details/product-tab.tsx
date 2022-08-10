import { useState } from 'react';
import { Tab } from '@headlessui/react';

type Props = {
  details?: string;
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductDetailsTab({ details }: Props) {
  let [tabHeading] = useState({
    DETALHES: '',
  });

  return (
    <div className="w-full xl:px-2 py-11 lg:py-14 xl:py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="block border-b border-skin-base space-s-8">
          {Object.keys(tabHeading).map(item => (
            <Tab
              key={item}
              className={({ selected }: any) =>
                classNames(
                  'relative inline-block transition-all text-15px lg:text-17px leading-5 text-skin-base focus:outline-none pb-3 lg:pb-5 hover:text-skin-primary',
                  selected
                    ? 'font-semibold after:absolute after:w-full after:h-0.5 after:bottom-0 after:translate-y-[1px] after:start-0 after:bg-skin-primary'
                    : ''
                )
              }
            >
              {item.split('_').join(' ')}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-6 lg:mt-9">
          <Tab.Panel className="lg:flex">
            <div
              dangerouslySetInnerHTML={{ __html: details ?? '' }}
              className="text-sm sm:text-15px text-skin-muted leading-[2em] space-y-4 lg:space-y-5 xl:space-y-7"
            ></div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
