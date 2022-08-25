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
