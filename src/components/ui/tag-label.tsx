import { Tag } from '@framework/basic-rest/types';
import cn from 'classnames';

interface Props {
  data: Tag;
  className?: string;
}

const TagLabel: React.FC<Props> = ({ className, data }) => (
  <div
    role="button"
    className={cn(
      'font-medium text-13px md:text-sm rounded hover:bg-skin-button-secondary block border border-sink-base px-2 py-1 transition',
      className
    )}
  >
    {data.name}
  </div>
);

export default TagLabel;
