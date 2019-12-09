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
import UiSidebar from './components/ui/UiSidebar'
import UiWindowToolbar from './components/ui/UiWindowToolbar'

export default {
	
	name: 'quarck',

	components: {
		UiSidebar,
		UiWindowToolbar
	},
	data () {
		return {
			servers: []
		}
	},

	methods: {
		eventServerAdded (name, address) {
			this.servers.push({
				name: name,
				url: address,
				icon: require('./assets/avatar.png')
			})
		}
	}
}
</script>

<style lang="less">
@import './colors.less';

#app {
	display: flex;
	flex-direction: column;
}

.app-content {
	display: flex;
	flex-grow: 1;
	align-items: stretch;
	background-color: @toolbar;
	&-content {
		flex-grow: 1;
	}
}

html, body, #app {
	margin: 0;
	color: @fc-default;
	background-color: @toolbar;
	width: 100%;
	height: 100%;
	font: 18px 'roboto', Arial, sans-serif;
	font-size: 100%;
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
		background-color: #262626;
	}
	&-track{
		background-color: #2e3233;
	}
}
</style>
