import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import TextTruncate from 'react-text-truncate';

interface Props {
  id: number;
  title: string;
  tagline: string;
  imageURL: string;
  imageTooltipText: string;
  description: string;
}

const BeerCard: React.FC<Props> = ({
  id,
  title,
  imageURL,
  tagline,
  description,
  imageTooltipText,
}) => {
  const tooltipId = `beer-ingredients-tooltip-${id}`;
  return (
    <>
      <div className="border bg-white border-gray-200 rounded-lg shadow-md p-4 hover:bg-sky-100 cursor-pointer">
        <div className="flex flex-row">
          <div className="mr-4">
            <img
              data-tooltip-id={tooltipId}
              data-tooltip-place="top"
              className="max-w-none w-24 h-48 object-contain"
              src={imageURL}
              alt={title}
            />
          </div>
          <div className="mt-1">
            <h2 className="text-3xl mb-2">{title}</h2>
            <div className="font-bold text-yellow-500 mb-3">
              {tagline}
            </div>
            <TextTruncate
              truncateText="…"
              text={description}
              line={2}
              element="p"
            />
          </div>
        </div>
      </div>

      <Tooltip id={tooltipId}>
        <div className="w-36">{imageTooltipText}</div>
      </Tooltip>
    </>
  );
};

export default BeerCard;
