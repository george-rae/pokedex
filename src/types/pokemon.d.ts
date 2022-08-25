export interface Generation {
  label: string;
  ID: number;
}

export interface GenerationGroup {
  [key: string]: Generation;
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
