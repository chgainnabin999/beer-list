import { DEFAULT_BEER_INGREDIENTS } from 'src/constants/beers';

/**
 * This function takes a formula object and returns a string containing the keys of the
 * object joined by commas, or a default value if the formula is empty or not an object.
 *
 * @param {Record<string, unknown>} formula - The `formula` parameter is a JavaScript object that represents a formula. It is of
 * type `Record<string, unknown>`, which means it can have any number of properties, where each
 * property key is a string and the corresponding value can be of any type.
 *
 * @returns a string that contains all major ingredients separated by a comma.
 */
export const getIngredients = (formula: Record<string, unknown>): string => {
    if (typeof formula != 'object' || Object.keys(formula).length === 0) {
        return DEFAULT_BEER_INGREDIENTS;
    }

    return Object.keys(formula).join(', ');
};
