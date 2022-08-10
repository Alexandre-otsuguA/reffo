import { Variation } from '@framework/basic-rest/types';
import cn from 'classnames';

interface Props {
  className?: string;
  list: Variation[];
  selectedVariation?: Variation['options'][0];
  setVariation: (variation: Variation['options'][0]) => void;
}

const ProductVariations: React.FC<Props> = ({
  className = 'mb-2 pt-0.5',
  list,
  selectedVariation,
  setVariation,
}) => {
  if (!list) return null;
  return (
    <>
      {list.map((item, idx) => (
        <div className={cn(className)} key={idx}>
          <h4 className="text-15px text-skin-base text-opacity-70 font-normal mb-3 capitalize">
            {item.name.split('-').join(' ')}:
          </h4>

          <ul className="flex flex-wrap -me-2">
            {item.options.map(opt => (
              <li
                key={opt.id}
                className={cn(
                  'cursor-pointer rounded border h-9 md:h-10 p-1 mb-2 md:mb-3 me-2 flex justify-center items-center font-medium text-sm md:text-15px text-skin-base transition duration-200 ease-in-out hover:text-skin-primary hover:border-skin-primary px-3',
                  {
                    'border-skin-primary text-skin-primary':
                      selectedVariation?.id === opt.id,
                  }
                )}
                onClick={() => setVariation(opt)}
              >
                {opt.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default ProductVariations;
