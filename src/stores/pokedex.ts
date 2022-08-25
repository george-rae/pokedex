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
      this.ID = gen;
      this.pokemons = [];
    },
    async fetchPokemon(ID: number) {
      const currentLength = this.currentLength;
      const inc = 12;

      const pokemon: any = await fetchData("pokedex", ID);

      this.currentMax = pokemon.pokemon_entries.length;

      if (this.currentLength <= this.currentMax) {
        this.currentLength = currentLength + inc;
      } else {
        this.currentLength = this.currentMax;
        return;
      }

      console.log("this is being called");

      this.pokemons.push(
        ...pokemon.pokemon_entries.slice(currentLength, currentLength + inc)
      );
    },
    async fetchMinorDetails(pokemon: string) {
      const details: any = await fetchData("pokemon", pokemon);

      return {
        types: [...details.types],
        sprite: details.sprites.other["official-artwork"].front_default,
      };
    },
  },
});
