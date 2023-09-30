import { DEFAULT_PAGE_SIZE } from 'src/constants/beers';
import {
    Beer,
    BeerFormData,
    BeerListTabChoice,
    PunkAPIBeerResponse,
} from 'src/types/Beer';
import { getIngredients } from 'src/utils/beer';
import LocalStorageUtil from 'src/utils/localStorage';

/**
 * The function `getBeers` retrieves a list of beers based on the specified page number, page size, and
 * data source.
 *
 * @param {number} pageNumber: The page number of the beer list to retrieve.
 * @param {number} pageSize: The page number of the beers to retrieve.
 * @param {BeerListTabChoice} dataSource: The data source of the beer list.
 *
 * @returns a promise that resolves to an object with the following properties:
 * - `data`: an array of `Beer` objects
 * - `hasNextPage`: an optional boolean value indicating if there is a next page of data available
 */
export async function getBeers({
    pageNumber,
    pageSize = DEFAULT_PAGE_SIZE,
    dataSource,
}: {
    pageNumber: number;
    pageSize?: number;
    dataSource: BeerListTabChoice;
}): Promise<{ data: Beer[]; hasNextPage?: boolean }> {
    const beerListLoaderByDataSource = {
        [BeerListTabChoice.ALL_BEERS]: getAllBeers,
        [BeerListTabChoice.MY_BEERS]: getMyBeers,
    };

    return beerListLoaderByDataSource[dataSource]({ pageNumber, pageSize });
}

/**
 * The function `getAllBeers` retrieves a list of beers from the Punk API based on the specified page
 * number and page size, and returns the parsed response.
 *
 * @param {number} pageNumber: The page number of the beers to retrieve from the API.
 * @param {number} pageSize: The page number of the beers to retrieve.
 *
 * @returns an object with a property called "data" which contains an array of parsed beer objects.
 */
async function getAllBeers({
    pageNumber,
    pageSize = DEFAULT_PAGE_SIZE,
}: {
    pageNumber: number;
    pageSize?: number;
}) {
    const response = await fetch(
        `https://api.punkapi.com/v2/beers?page=${pageNumber}&per_page=${pageSize}`
    );
    const responseJSON: PunkAPIBeerResponse[] = await response.json();

    const parsedResponse = responseJSON.map(
        ({ id, name, tagline, description, image_url, ingredients }) => {
            return {
                id,
                name,
                tagline,
                description,
                imageURL: image_url,
                ingredients: getIngredients(ingredients),
            };
        }
    );

    return { data: parsedResponse };
}

const myBeersStorage = new LocalStorageUtil<Beer[]>('myBeers');

/**
 * The function `getMyBeers` retrieves a subset of beers from storage based on the specified page
 * number and page size.
 *
 * @param {number} pageNumber: The page number of the beers to retrieve.
 * @param {number} pageSize: The page number of the beers to retrieve.
 *
 * @returns an object with two properties: "data" and "hasNextPage". The "data" property contains a
 * slice of the "myBeers" array, starting from the "startIndex" and ending at the "endIndex". The
 * "hasNextPage" property is a boolean value indicating whether there are more elements in the
 * "myBeers" array beyond the "endIndex
 */
function getMyBeers({
    pageNumber,
    pageSize = DEFAULT_PAGE_SIZE,
}: {
    pageNumber: number;
    pageSize?: number;
}) {
    const myBeers = myBeersStorage.load() || [];
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return {
        data: myBeers.slice(startIndex, endIndex),
        hasNextPage: myBeers.length > endIndex,
    };
}

/**
 * The function creates a new beer object using the provided form data and saves it to the list
 * of beers in the storage implementation for `My beers`.
 *
 * @param {BeerFormData} form - The `form` parameter is of type `BeerFormData`.
 */
export function createMyBeer(form: BeerFormData) {
    const previousBeers = myBeersStorage.load();
    const lastBeerId = previousBeers?.[0].id || 1;

    myBeersStorage.save([
        {
            name: form.name,
            id: lastBeerId + 1,
            tagline: form.genre,
            description: form.description,
            ingredients: 'Unknown',
            imageURL: form.imageURL,
        },
        ...(previousBeers || []),
    ]);
}
