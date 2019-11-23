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
					url: 'test1.anteiku.de',
					icon: require('./assets/avatar.png'),
					chats: [
						{
							name: 'Test',
							messages: [
							{
								username: 'Topi',
								icon: this.icon,
								text: 'Hellow World!'
							},
							{
								username: 'Idiot',
								icon: this.icon,
								text: 'stfu'
							},
							{
								username: 'Topi',
								icon: this.icon,
								text: 'ok'
							},
							]
						}
					],
					users: [
						{
							name: 'Topi',
							icon: ''
						}
					]
				}
			]
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
	align-items: stretch;
	flex: 1 1 auto;
	background-color: @primary;
	&-content {
		flex: 1 1 auto;
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
</style>
