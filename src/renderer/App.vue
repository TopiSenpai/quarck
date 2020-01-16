<template>
	<div id="app">
		<ui-window-toolbar />
		<div class="app-content">
			<ui-sidebar :servers="servers" @add-server="eventServerAdded"></ui-sidebar>
			<router-view class="app-content-content"></router-view>
		</div>
	</div>
</template>

<script>
import UiSidebar from "./components/ui/UiSidebar";
import UiWindowToolbar from "./components/ui/UiWindowToolbar";

export default {

	name: "quarck",

	components: {
		UiSidebar,
		UiWindowToolbar,
	},
	data () {
		return {
			servers: [],
		};
	},

	methods: {
		eventServerAdded (name, address) {
			this.servers.push({
				name: name,
				url: address,
				icon: require("./assets/avatar.png"),
			});
		},
	},
};
</script>

<style lang="less">
@import './style/style.less';

#app {
	.flexColumn;
	user-select: none;
}

.app-content {
	.flexRow;
	flex-grow: 1;
	background-color: @toolbar;
	&-content {
		flex-grow: 1;
	}
}

html, body, #app {
	margin: 0;
	.fc;
	.font();
	.toolbar;
	width: 100%;
	height: 100%;
	cursor: default;
}

.ui-icon-button{
	cursor: pointer!important;
}

.tippy-tooltip{
	background-color: @tooltip!important;
}

*,
*::before,
*::after {
	box-sizing: border-box;
}

*::-webkit-scrollbar{
	background-color: transparent;
	width: 10px;
	&-thumb{
		background-color: @scrollbar-thumb;
	}
	&-track{
		background-color: @scrollbar-track;
	}
}
</style>
