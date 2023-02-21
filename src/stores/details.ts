import { defineStore } from "pinia";
import type Details from "@/types/details";
import fetchData from "@/helpers/fetch";

export default defineStore({
  id: "details",
  state: (): Details => ({
    name: "",
    id: 0,
    loading: "",
    evolution_chain: "",
    details: [],
  }),
  getters: {
    getCurrentName: (state) => state.name,
    getLoading: (state) => state.loading,
    getDetails: (state) => state.details,
  },
  actions: {
    /**
     * A further wrapping and mutation of returned fetched API data for assinging a specific pokemon to the state.
     *
     * @example <caption>Usage usually occurs after a pokemon has been chosen with another call, so is normally either `callback` or later on</caption>
     * details.assignPokemon(name);
     * @param {string} name The API name of the pokemon to be assigned into the state.
     * @returns {Promise<void>} Sets the curent pokemon info in the state and sets a `localStorage` variable.
     */
    async assignPokemon(name: string) {
      // need to get the species first as some pokemon returned from `pokedex` call
      // do not match their name in the API calls for /pokemon/{name}...
      const species: any = await fetchData("pokemon-species", name);
      const APIName: string = species.varieties[0].pokemon.name;
      this.name = APIName;
      this.evolution_chain = species.evolution_chain.url;
      window.localStorage.setItem("currentName", APIName);
    },
    /**
     * A further wrapping and mutation of returned fetched API data of all pokemon details.
     *
     * @example <caption>Destructured asynchronous call to get the pokemon types</caption>
     * const { types } = await store.fetchDetails(props.name as string);
     * @param {string} pokemonName The API name of the pokemon whose details will be obtained.
     * @returns {any} `JSON` structure with all the infomation on the chosen pokemon.
     */
    async fetchDetails(pokemonName: string) {
      const details: any = await fetchData("pokemon", pokemonName);
      const target = { name: details.name, id: details.id, details };
      Object.assign(this, target);

      return details;
    },
  },
});
