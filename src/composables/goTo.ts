import { usePokedexStore } from "@/stores/pokedex";
import useDetailsStore from "@/stores/details";
import router from "@/router";
import type { Generation } from "@/types/pokemon";

/**
 * Fetches the Pokemon from `name` param, usually called within Vue component or view
 *
 * @example <caption>Called from a Vue view file on inline click event handler</caption>
 * v-on:click="detailsLink(pokemon.pokemon_species.name)" or `@click` but JSDocs hates that...
 *
 * @param {string} name printed name of the pokemon.
 * @returns {void} resets state then pushes value to the router.
 */
function details(name: string) {
  const store = useDetailsStore();
  store.loading = true;
  store.assignPokemon(name);

  const pokedex = usePokedexStore();

  setTimeout(() => {
    pokedex.$reset();
    router.push({ name: "details", params: { pokemon: name } });
  }, 1500);
}

/**
 * Fetches the Pokemon from `name` param, usually called within Vue component or view
 *
 * @example <caption>Called from a Vue view file on inline click event handler</caption>
 * v-on:click="detailsLink(pokemon.pokemon_species.name)" or `@click` but JSDocs hates that...
 *
 * @param {number} id generation ID.
 * @returns {void} resets state then pushes value to the router.
 */
function generations(generation: Generation) {
  const store = useDetailsStore();
  store.loading = true;

  const pokedex = usePokedexStore();
  pokedex.changeGen(generation.ID);

  setTimeout(() => {
    router.push({ name: "generation", params: { gen: generation.slug } });
  }, 1500);
}

export default { details, generations };
