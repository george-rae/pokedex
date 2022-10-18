import { defineStore } from "pinia";
import type Details from "@/types/details";
import fetchData from "@/helpers/fetch";

export default defineStore({
  id: "details",
  state: (): Details => ({
    name: "",
    loading: "",
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
    },
    async fetchDetails(name: string) {
      const details: any = await fetchData("pokemon", name);
      this.details = details;

      return details;
    },
  },
});
