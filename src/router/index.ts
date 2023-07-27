import { createRouter, createWebHistory } from "vue-router";
import GenerationView from "../views/GenerationView.vue";
import ListView from "../views/ListView.vue";
import DetailView from "../views/DetailView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: GenerationView,
    },
    {
      path: "/generation/:gen",
      name: "generation",
      component: ListView,
    },
    {
      path: "/details/:pokemon",
      name: "details",
      component: DetailView,
    },
  ],
});

export default router;
