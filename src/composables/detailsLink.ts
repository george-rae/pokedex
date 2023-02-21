import { usePokedexStore } from "@/stores/pokedex";
import useDetailsStore from "@/stores/details";
import router from "@/router";

/**
 * Fetches the Pokemon from `name` param, usually called within Vue component or view
 *
 * @example <caption>Called from a Vue view file on inline click event handler</caption>
 * v-on:click="detailsLink(pokemon.pokemon_species.name)" or `@click` but JSDocs hates that...
 *
 * @param {string} name printed name of the pokemon.
 * @returns {void} resets state then pushes value to the router.
 */
export default function detailsLink(name: string) {
  const details = useDetailsStore();
  details.loading = true;
  details.assignPokemon(name);

  const pokedex = usePokedexStore();

  setTimeout(() => {
    pokedex.$reset();
    router.push({ name: "details", params: { pokemon: name } });
  }, 1500);
}
