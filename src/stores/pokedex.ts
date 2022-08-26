import { defineStore } from "pinia";
import type PokeState from "@/types/pokemon";
import fetchData from "@/helpers/fetch";

export const usePokedexStore = defineStore({
  id: "pokedex",
  state: (): PokeState => ({
    ID: 2,
    pokemons: [],
    currentLength: 0,
    currentMax: 151,
    cardDetails: {
      types: [],
      sprite: "",
    },
  }),
  getters: {
    getPokedexID: (state) => state.ID,
    getPokemon: (state) => state.pokemons,
  },
  actions: {
    changeGen(gen: number) {
      this.$reset();
      this.ID = gen;
    },
    async fetchPokemon(ID: number) {
      const currentLength = this.currentLength;
      const inc = 12;

      const pokemon: any = await fetchData("pokedex", ID);

      // getting the max entry number for current pokedex.
      this.currentMax = pokemon.pokemon_entries.length;

      // adding current length to keep track of `splice()` start position.
      if (this.currentLength <= this.currentMax) {
        this.currentLength = currentLength + inc;
      } else {
        // if currentLength exceeds the pokedex length then do no more.
        this.currentLength = this.currentMax;
        return;
      }

      // push the spread array to the state variable so the result can be cached with a getter.
      this.pokemons.push(
        ...pokemon.pokemon_entries.slice(currentLength, currentLength + inc)
      );
    },
    async fetchMinorDetails(pokemon: string) {
      // need to get the species first as some pokemon returned from `pokedex` call
      // do not match their name in the API calls for /pokemon/{name}...
      const species: any = await fetchData("pokemon-species", pokemon);
      const APIName: string = species.varieties[0].pokemon.name;

      // use the filtered API name to make the fetch()
      const details: any = await fetchData("pokemon", APIName);

      return {
        types: [...details.types],
        ID: details.id,
        sprite: details.sprites.other["official-artwork"].front_default,
      };
    },
  },
});
