<template>
	<div id="app">
		<ui-window-toolbar></ui-window-toolbar>
		<div class="app-content">
			<ui-sidebar :servers="servers"></ui-sidebar>
			<router-view class="app-content-content"></router-view>
		</div>
	</div>
</template>

<script>
import UiSidebar from './components/UiSidebar'
import UiWindowToolbar from './components/UiWindowToolbar'

export default {
	
	name: 'quarck',
	
	components: {
	UiSidebar,
	UiWindowToolbar
	},

	data () {
	return {
		servers: [
			{
				name: 'test1',
				url: 'test1.anteiku.de'
			},
			{
				name: 'test2',
				url: 'test2.anteiku.de'
			},
			{
				name: 'test3',
				url: 'test3.anteiku.de'
			},
		]
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
	align-items: stretch;
	flex: 1 1 auto;
	&-content {
		flex: 1 1 auto;
	}
}

html, body, #app {
	margin: 0;
	color: white;
	background-color: @primary;
	width: 100%;
	height: 100%;
	font: 13px 'roboto', Arial, sans-serif
}

* {
	box-sizing: border-box;
}
</style>
