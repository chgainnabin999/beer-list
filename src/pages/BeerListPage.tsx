import { useContext, useState } from 'react';
import AddBeerForm from 'src/components/Beers/AddBeerForm';
import BeerList from 'src/components/Beers/BeerList';
import BeerListTabs from 'src/components/Beers/BeerListTabs';
import Button from 'src/components/common/Button';
import Loader from 'src/components/common/Loader';
import Modal from 'src/components/common/Modal';
import { LOAD_MORE_BEERS_ICON_UNICODE } from 'src/constants/beers';
import { BeerContext } from 'src/context/Beer';
import { BeerListTabChoice } from 'src/types/Beer';

const BeerListPage: React.FC = () => {
    const [isAddBeerModalOpen, setIsAddBeerModalOpen] = useState(false);
    const beerContext = useContext(BeerContext);

    const loadMoreBeers = beerContext?.hasMoreBeers ? (
        <button
            className="text-blue-700 font-bold align-middle flex hover:text-blue-500"
            onClick={() => {
                beerContext?.loadMoreBeers();
            }}
        >
            Load more
            <div className="text-2xl ml-2 -translate-y-1">
                {LOAD_MORE_BEERS_ICON_UNICODE}
            </div>
        </button>
    ) : null;

    return (
        <>
            <div>
                <div className="flex pt-3 pl-5">
                    <BeerListTabs />
                    {beerContext?.selectedTab === BeerListTabChoice.MY_BEERS ? (
                        <div className="ml-auto mr-4">
                            <Button onClick={() => setIsAddBeerModalOpen(true)}>
                                Add a new beer
                            </Button>
                        </div>
                    ) : null}
                </div>

                {!beerContext?.beers?.length &&
                beerContext?.isLoading ? null : (
                    <BeerList beers={beerContext?.beers || []} />
                )}
                <div className="flex justify-center pb-2">
                    {beerContext?.isLoading ? <Loader /> : loadMoreBeers}
                </div>
            </div>
            <Modal
                isOpen={isAddBeerModalOpen}
                title="Add a New Beer"
                setIsOpen={setIsAddBeerModalOpen}
            >
                <AddBeerForm closeModal={() => setIsAddBeerModalOpen(false)} />
            </Modal>
        </>
    );
};

export default BeerListPage;
