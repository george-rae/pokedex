import { usePokedexStore } from "@/stores/pokedex";
import useDetailsStore from "@/stores/details";
import router from "@/router";

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
