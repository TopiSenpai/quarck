<template>
	<div class="view-settings">
		<div class="view-settings-header">
			<span>Settings</span>
			<ui-icon-button icon="close" type="secondary" color="red" @click="$router.go(-1)" />
		</div>
		<div class="view-settings-content">
			<ui-setting label="Username">
				username: {{ username }}
				<ui-textbox v-model="username" placeholder="username..." />
			</ui-setting>

			<ui-setting label="Public Key">
				<span>
					{{ getPublicKey }}
				</span>
			</ui-setting>

			<ui-setting label="Private Key">
				<span>
					{{ getPrivateKey }}
				</span>
			</ui-setting>
			<ui-button color="primary" type="secondary" @click="eventRegenerateKeyPair">Regenerate Key Pair</ui-button>
		</div>
		<div class="view-settings-footer">
			<ui-button color="green" type="primary" @click="eventSaveSettings">Save</ui-button>
			<ui-button color="red" type="secondary" @click="$router.go(-1)">cancel</ui-button>
		</div>
	</div>
</template>
<script>
import UiSetting from './ui/UiSetting'
import network from '../../main/network'
import { mapGetters } from 'vuex'

export default {
	
	name: 'view-settings',

	components: {
		UiSetting,
	},

	data () {
		return {
			username: ''
		}
	},

	mounted(){
		this.username = this.getUsername
	},

	computed: {
		...mapGetters([
			'getUsername',
			'getPublicKey',
			'getPrivateKey',
		])
	},

	methods: {
		eventRegenerateKeyPair() {

		},
		eventSaveSettings(){
			this.$store.dispatch('username', this.username)
			network.sendUserUpdate()
		}
	}
}
</script>
<style lang="less" scoped>
@import '../colors.less';

/deep/ .ui-button {
	width: fit-content;
	cursor: pointer;
}

.view-settings{
	display: flex;
	flex-direction: column;
	background-color: @primary;
	&-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16px;
		font-size: 150%;
		font-weight: bold;
		border-bottom: 1px solid #2b2b2b;
	}
	&-content{
		display: flex;
		flex-direction: column;
		padding: 16px;
		flex-grow: 1;
		border-bottom: 1px solid #2b2b2b;
	}
	&-footer {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 16px;
	}
}
</style>