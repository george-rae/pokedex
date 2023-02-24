import { defineStore } from "pinia";
import type { PokeState, Pokedex, Species, Pokemon } from "@/types/pokemon";
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
    /**
     * Used to completely reset the pokedex state then change the generation to what was chosen.
     *
     * @example <caption>resets state and changes gen.</caption>
     * pokedex.changeGen(ID as number);
     * @param {number} gen PokeDex ID passed from a prop on the button (stored in "@/data/generations").
     * @returns {void} reset state and update gen.
     */
    changeGen(gen: number) {
      this.$reset();
      this.ID = gen;
    },
    /**
     * A further wrapping and mutation of returned fetched API data list of all pokemon in the chosen gen.
     * Loads 12 at a time, as loading all 151 in the first load of the page is very intensive, so loads on the fly.
     *
     * @example <caption>Asynchronous fetching Pokemon (12 at a time for purpose built lazy loading)</caption>
     * await pokedex.fetchPokemon(pokedex.ID);
     * @param {number} ID Usually fetched directly from the store where it is called.
     * @returns {Promise<void>} Pushes the returned `JSON` to a state variable that the Vue file will read reactively.
     */
    async fetchPokemon(ID: number) {
      const { currentLength } = this;
      const inc = 12;

      const pokemon: Pokedex = await fetchData("pokedex", ID);

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
    /**
     * A further wrapping and mutation of returned fetched API data for some small amount of details on the preview cards (Home View).
     *
     * @example <caption>Asynchronous fetching Pokemons minor details, so that it can be shown on the preview card</caption>
     * const details = await pokedex.fetchMinorDetails(props.name);
     * const { sprite, types, ID } = details;
     * @param {string} pokemon Usually fetched directly from the store where it is called.
     * @returns {Promise<any>} Pushes the returned `JSON` to a state variable that the Vue file will read reactively.
     */
    async fetchMinorDetails(pokemon: string) {
      // need to get the species first as some pokemon returned from `pokedex` call
      // do not match their name in the API calls for /pokemon/{name}...
      const species: Species = await fetchData("pokemon-species", pokemon);
      const APIName: string = species.varieties[0].pokemon.name;

      // use the filtered API name to make the fetch()
      const details: Pokemon = await fetchData("pokemon", APIName);

      return {
        types: [...details.types],
        id: details.id,
        sprite: details.sprites.other["official-artwork"].front_default,
        is_legendary: species.is_legendary,
      };
    },
  },
});
