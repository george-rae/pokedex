export interface Generation {
  label: string;
  ID: number | Generation[];
}

export interface GenerationGroup {
  [key: any]: Generation[];
}

interface PokeState {
  ID: number;
  pokemons: any;
  currentLength: number;
  currentMax: number;
  cardDetails: {
    types: list;
    sprite: string;
  };
}

export default PokeState;
