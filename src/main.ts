import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import JsonViewer from "vue-json-viewer";

import "vue-json-viewer/style.css";
import "./assets/main.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(JsonViewer);

app.mount("#app");
