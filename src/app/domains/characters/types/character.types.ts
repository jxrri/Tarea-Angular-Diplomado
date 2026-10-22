import { Planet } from '@domains/planets/types/planet.types';

/** Subset of the /characters payload that the app actually uses. */
export interface Character {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  affiliation: string;
  image: string;
  description?: string;
}

export interface Transformation {
  id: number;
  name: string;
  image: string;
  ki: string;
}

/** /characters/:id adds the origin planet and the transformations. */
export interface CharacterDetail extends Character {
  originPlanet?: Planet;
  transformations?: Transformation[];
}

/** Everything that defines a search in the list view; 'all' means "no filter". */
export interface CharacterQuery {
  page: number;
  name: string;
  race: string;
  gender: string;
}

export const RACES = ['Saiyan', 'Human', 'Namekian', 'Frieza Race', 'Android', 'Majin', 'God', 'Angel'];
export const GENDERS = ['Male', 'Female', 'Unknown'];
