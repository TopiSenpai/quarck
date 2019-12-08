<template>
	<div class="view-settings">
		<div class="view-settings-header">
			<span class="view-settings-header-text">Settings</span>
		</div>
		<div class="view-settings-content">
			<ui-setting label="Username">
				<ui-textbox v-model="username" placeholder="username..." />
			</ui-setting>

			<ui-setting label="Public Key">
				<span>
					{{ $store.getters.getPublicKey }}
				</span>
			</ui-setting>

			<ui-setting label="Private Key">
				<span>
					{{ $store.getters.getPrivateKey }}
				</span>
			</ui-setting>
			<ui-button color="primary" type="secondary" @click="eventRegenerateKeyPair">Regenerate Key Pair</ui-button>
		</div>
		<div class="view-settings-footer">
			<ui-button color="green" type="primary" @click="eventSaveSettings">Save</ui-button>
		</div>
	</div>
</template>
<script>
import { UiTextbox, UiButton } from 'keen-ui'
import UiSetting from './ui/UiSetting'
import { mapGetters } from 'vuex'

export default {
	
	name: 'view-settings',
	
	data () {
		return {
			username: this.getUsername
		}
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

		}
	},

	components: {
		UiTextbox,
		UiButton,
		UiSetting,
	}
}
</script>
<style lang="less" scoped>

/deep/ .ui-button {
	width: fit-content;
	cursor: pointer;
}

.view-settings{
	display: flex;
	flex-direction: column;
	&-header {
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
		padding: 16px;
	}
}
</style>