import Vue from "vue";
import App from "./App.vue";

import Game from "./pages/game";
import Space from "./components/space";

Vue.component("space", Space);
Vue.component("game", Game);

new Vue({
  el: "#app",
  render: h => h(App)
});
