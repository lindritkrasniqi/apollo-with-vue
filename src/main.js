import { createApp } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { createPinia } from "pinia";
import apolloClient from "~/plugins/apollo";
import router from "~/router";
import App from "./App";
import defaultLayout from "~/layouts/default";
import loggedInLayout from "~/layouts/loggedIn";

createApp(App)
  .provide(DefaultApolloClient, apolloClient)
  .use(createPinia())
  .use(router)
  .component("default", defaultLayout)
  .component("loggedIn", loggedInLayout)
  .mount("#app");
