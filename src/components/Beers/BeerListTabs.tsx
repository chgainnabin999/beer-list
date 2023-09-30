import { useContext } from 'react';
import { BeerContext } from 'src/context/Beer';
import { BeerListTabChoice } from 'src/types/Beer';

const BeerListTabs: React.FC = () => {
    const beerContext = useContext(BeerContext);

    return Object.values(BeerListTabChoice).map((tab) => (
        <div
            className={`mr-4 text-lg ${
                tab === beerContext?.selectedTab
                    ? 'opacity-40'
                    : 'cursor-pointer'
            }`}
            key={tab}
            onClick={() => {
                beerContext?.setSelectedTab(tab);
            }}
        >
            {tab}
        </div>
    ));
};

export default BeerListTabs;
