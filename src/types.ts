export interface Volume {
  value: number;
  unit: string;
}

export interface Malt {
  name: string;
  amount: Volume;
}

export interface Hops {
  name: string;
  amount: Volume;
  attribute: string;
  add: string;
}

export interface Ingredients {
  malt: Malt[];
  hops: Hops[];
  yeast: string;
}

export interface IngredientsProp {
  malt: Malt[];
  hops: Hops[];
  yeast: string;
  brewers_tips: string;
}

export interface BeerProp {
  id: number;
  name: string;
  abv: number;
  volume: Volume;
  ingredients: Ingredients;
  description: string;
  image_url: string;
  food_pairing: string[];
  brewers_tips: string;
}

export interface SearchBarProp {
  onSearch: (value: React.SetStateAction<string>) => void;
}

export interface NavButtonProp {
  setPage: (value: React.SetStateAction<number>) => void;
  disabled: boolean;
  text: 'prev' | 'next';
}
