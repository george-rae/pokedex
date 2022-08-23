interface PokeState {
  ID: number;
  pokemons: any;
  cardDetails: {
    types: list;
    sprite: string;
  };
}

export default PokeState;
