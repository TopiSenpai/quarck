import Vue from "vue";
import axios from "axios";
import KeenUi from "keen-ui";

import store from "../stores/store";
import network from "../main/network";

import { UiIconButton, UiIcon } from "keen-ui";
import App from "./App";
import router from "./router";
import "keen-ui/dist/keen-ui.css";

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

Vue.use(KeenUi);

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount("#app");
