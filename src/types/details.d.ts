interface Details {
  name: string;
  id: number;
  loading: boolean | string;
  evolution_chain: string;
  details: PokeDetails | [];
}

export interface PokeDetails {
  types: list;
}

export default Details;
