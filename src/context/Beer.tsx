import { ReactNode, createContext, useEffect, useState } from 'react';
import { DEFAULT_PAGE_SIZE, INITIAL_PAGE_NUMBER } from 'src/constants/beers';
import { createMyBeer, getBeers } from 'src/services/beer';
import { Beer, BeerFormData, BeerListTabChoice } from 'src/types/Beer';

interface BeerContextProps {
    isLoading: boolean;
    beers: Beer[];
    pageNumber: number;
    setIsLoading: (isLoading: boolean) => void;
    fetchAllBeers: (pageNumber?: number) => Promise<void>;
    loadMoreBeers: () => void;
    hasMoreBeers: boolean;
    selectedTab: BeerListTabChoice;
    setSelectedTab: (tab: BeerListTabChoice) => void;
    createBeer: (beer: BeerFormData) => void;
}

export const BeerContext = createContext<null | BeerContextProps>(null);

export const BeerContextProvider: React.FC<{
    children: ReactNode;
}> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [allBeers, setAllBeers] = useState<{
        data: Beer[];
        hasNext: boolean;
    }>({ data: [], hasNext: false });
    const [pageNumber, setPageNumber] = useState(INITIAL_PAGE_NUMBER);
    const [selectedTab, setSelectedTab] = useState<BeerListTabChoice>(
        BeerListTabChoice.ALL_BEERS
    );
    const [myBeers, setMyBeers] = useState<{
        data: Beer[];
        hasNext: boolean;
    }>({ data: [], hasNext: false });

    const beers =
        selectedTab === BeerListTabChoice.ALL_BEERS
            ? allBeers.data
            : myBeers.data;
    const hasMoreBeers =
        selectedTab === BeerListTabChoice.ALL_BEERS
            ? allBeers.hasNext
            : myBeers.hasNext;

    const loadMoreBeers = () => {
        const newPageNumber = pageNumber + 1;
        setPageNumber(newPageNumber);
        fetchAllBeers(newPageNumber);
    };

    const setBeers = ({
        beers,
        hasNext,
    }: {
        beers: Beer[];
        hasNext: boolean;
    }) =>
        selectedTab === BeerListTabChoice.ALL_BEERS
            ? setAllBeers({ data: beers, hasNext })
            : setMyBeers({ data: beers, hasNext });

    const createBeer = (formValues: BeerFormData) => {
        if (selectedTab !== BeerListTabChoice.MY_BEERS) {
            console.error(
                `Cannot add beer when selected tab is ${selectedTab}`
            );
            return;
        }

        setIsLoading(true);
        createMyBeer(formValues);
        setPageNumber(INITIAL_PAGE_NUMBER);
        fetchAllBeers(INITIAL_PAGE_NUMBER, true);
    };

    const fetchAllBeers = async (
        pageNumber: number = INITIAL_PAGE_NUMBER,
        shouldResetBeers: boolean = false
    ) => {
        setIsLoading(true);
        try {
            const { data: beersInCurrentPage, hasNextPage } = await getBeers({
                pageNumber: pageNumber,
                dataSource: selectedTab,
            });

            let newBeers = [...beers, ...beersInCurrentPage];

            if (shouldResetBeers) {
                newBeers = [...beersInCurrentPage];
            }

            setBeers({
                beers: newBeers,
                hasNext:
                    typeof hasNextPage === 'boolean'
                        ? hasNextPage
                        : beersInCurrentPage.length === DEFAULT_PAGE_SIZE,
            });
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (beers?.length === 0) {
            fetchAllBeers();
        }
    }, [selectedTab]);

    return (
        <BeerContext.Provider
            value={{
                isLoading,
                setIsLoading,
                beers,
                pageNumber,
                fetchAllBeers,
                loadMoreBeers,
                hasMoreBeers,
                selectedTab,
                setSelectedTab,
                createBeer,
            }}
        >
            {children}
        </BeerContext.Provider>
    );
};
