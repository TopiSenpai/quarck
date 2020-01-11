import Vue from "vue";
import Router from "vue-router";

import ViewOverview from "./components/ViewOverview";
import ViewHome from "./components/ViewHome";
import ViewGames from "./components/ViewGames";
import ViewSettings from "./components/ViewSettings";
import ViewChat from "./components/ViewChat";
import ViewUsers from "./components/ViewUsers";
import ViewServer from "./components/ViewServer";
import ViewNotFound from "./components/ViewNotFound";

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: "/",
			component: ViewOverview,
			children: [
				{
					path: "/",
					component: ViewHome,
				},
				{
					path: "/users",
					component: ViewUsers,
				},
				{
					path: "/games",
					component: ViewGames,
				},
				{
					path: "chat/:id",
					component: ViewChat,
				},
			],
		},
		{
			path: "/settings",
			component: ViewSettings,
		},
		{
			path: "/server/:url",
			component: ViewServer,
		},
		{
			path: "*",
			component: ViewNotFound,
		},
	],
});
