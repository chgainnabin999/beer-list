import { Beer } from 'src/types/Beer';
import BeerCard from './BeerCard';

interface Props {
    beers: Beer[];
}
const BeerList: React.FC<Props> = ({ beers }) => {
    if (beers.length === 0) {
        return (
            <div className="flex justify-center">
                <h2 className="border lg:w-1/3 md:w-1/2 w-2/3  bg-white rounded-lg shadow-sm p-4 text-4xl mt-5 text-center">
                    No beers added yet!
                </h2>
            </div>
        );
    }

    const beerCardList = beers.map((beer) => {
        return (
            <BeerCard
                key={beer.id}
                {...beer}
                title={beer.name}
                imageTooltipText={`Ingredients: ${beer.ingredients}`}
            />
        );
    });

    return (
        <div className="grid grid lg:grid-cols-2 grid-cols-1 gap-4 p-4 py-8 font-primary">
            {beerCardList}
        </div>
    );
};

export default BeerList;
