import Vue from "vue";
import KeenUi from "keen-ui";
import VueShowdown from "vue-showdown";

import store from "../stores/store";

import App from "./App";
import router from "./router";
import "keen-ui/dist/keen-ui.css";

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
Vue.config.productionTip = false;

Vue.use(KeenUi);
Vue.use(VueShowdown, {
	flavor: "github",
	options: {
		emoji: true,
		tables: true,
		//openLinksInNewWindow: true,
	},
});

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount("#app");
