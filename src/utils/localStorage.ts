class LocalStorageUtil<T> {
    private key: string;

    constructor(key: string) {
        this.key = key;
    }

    /**
     * The save function takes an input data, serializes it into JSON format, and saves it to the
     * localStorage.
     *
     * @param {T} data - The `data` parameter is the data that you want to save to the localStorage. It
     * can be of any type, as long as it can be serialized into a JSON string using `JSON.stringify()`.
     */
    save(data: T): void {
        try {
            const serializedData = JSON.stringify(data);
            localStorage.setItem(this.key, serializedData);
        } catch (error) {
            console.error('Error saving data to localStorage:', error);
        }
    }

    /**
     * The `load` function retrieves and deserializes data from localStorage, returning it as a generic
     * type `T` or `null` if an error occurs.
     *
     * @returns The `load()` function returns either a `T` (the deserialized data from localStorage) or
     * `null` if there is no data or an error occurs while loading the data.
     */
    load(): T | null {
        try {
            const serializedData = localStorage.getItem(this.key);
            if (serializedData === null) {
                return null;
            }
            return JSON.parse(serializedData);
        } catch (error) {
            console.error('Error loading data from localStorage:', error);
            return null;
        }
    }
}

export default LocalStorageUtil;
