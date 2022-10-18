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
    async assignPokemon(name: string) {
      // need to get the species first as some pokemon returned from `pokedex` call
      // do not match their name in the API calls for /pokemon/{name}...
      const species: any = await fetchData("pokemon-species", name);
      const APIName: string = species.varieties[0].pokemon.name;
      this.name = APIName;
      this.evolution_chain = species.evolution_chain.url;
    },
    async fetchDetails(pokemonName: string) {
      const details: any = await fetchData("pokemon", pokemonName);
      const target = { name: details.name, id: details.id, details: details };
      Object.assign(this, target);

      return details;
    },
  },
});
