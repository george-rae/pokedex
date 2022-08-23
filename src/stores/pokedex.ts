import { defineStore } from "pinia";
import type PokeState from "@/types/pokemon";
import fetchData from "@/helpers/fetch";

export const usePokedexStore = defineStore({
  id: "pokedex",
  state: (): PokeState => ({
    ID: 2,
    pokemons: [],
  }),
  getters: {
    getPokedexID: (state) => state.ID,
    getPokemon: (state) => state.pokemons,
  },
  actions: {
    changeGen(gen: number) {
      this.ID = gen;
    },
    async fetchPokemon(ID: number) {
      const pokemon: any = await fetchData("pokedex", ID);

      this.pokemons.push(pokemon.pokemon_entries);
    },
    async fetchMinorDetails(pokemon: string) {
      const details: any = await fetchData("pokemon", pokemon);

      return [details.types];
    },
  },
});
