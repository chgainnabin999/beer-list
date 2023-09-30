export interface Beer {
  id: number;
  name: string;
  tagline: string;
  ingredients: string;
  imageURL: string;
  description: string;
}

export interface BeerFormData {
  name: string;
  genre: string;
  description: string;
  imageURL: string;
}

export interface PunkAPIBeerResponse {
  id: number;
  name: string;
  tagline: string;
  description: string;
  image_url: string;
  ingredients: Record<string, unknown>;
}

export enum BeerListTabChoice {
  ALL_BEERS = 'All Beers',
  MY_BEERS = 'My Beers',
}
