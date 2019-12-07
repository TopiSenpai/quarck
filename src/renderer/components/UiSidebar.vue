<template>
	<div class="ui-sidebar">
		<div>
			<router-link to="/settings">
				<ui-icon class="server-icon" type="secondary" icon="settings_applications" color="white" />
			</router-link>
			<ui-tooltip position="right">Settings</ui-tooltip>
		</div>
		<div>
			<router-link to="/server/local">
				<ui-icon class="server-icon" type="secondary" icon="public" color="white" />
			</router-link>
			<ui-tooltip position="right">Public Chat</ui-tooltip>
		</div>
		<div v-for="server in servers" :key="server.url">
			<router-link :to="`/server/${server.url}`">
				<img :src="server.icon" class="server-icon" />
				<ui-tooltip position="right-end">{{ server.name }}</ui-tooltip>
			</router-link>
		</div>
		<div>
			<ui-icon-button class="server-icon" type="secondary" icon="add" color="white" tooltip="Add Server" tooltipPosition="right-end" @click="openAddServerModal" />
		</div>
		<ui-modal ref="addServer">
			<ui-textbox label="Name" />
			<ui-textbox label="IP-Address" />
			<ui-icon-button v-model="address" label="connect" icon="arrow_forward_ios" color="white" @click="addServer" />
		</ui-modal>
	</div>
</template>

<script>
import { UiIcon, UiIconButton, UiModal, UiTooltip, UiTextbox } from 'keen-ui'

export default {
	name: "ui-sidebar",

	props: {
		servers: {
			required: true,
			type: Array
		}
	},

	components: {
		UiIcon,
		UiIconButton,
		UiModal,
		UiTooltip,
		UiTextbox
	},
	
	data () {
		return {
			name: '',
			address: ''
		}
	},

	methods: {
		openAddServerModal () {
			this.$refs.addServer.open()
		},
		addServer () {
			this.$emit('add-server', this.name, this.address)
			this.name = ''
			this.address = ''
		}
	}
};
</script>

<style lang="less" scoped>
@import "../colors.less";

.server-icon {
	width: 60px;
	height: 60px;
	font-size: 60px;
	color: @icon;
}

.ui-sidebar {
	display: flex;
	flex-direction: column;
	padding: 8px;
	background-color: @toolbar;
	overflow-y: auto;
}
</style>