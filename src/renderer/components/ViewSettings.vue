<template>
	<div class="view-settings">
		<div class="view-settings-header">
			<span>Settings</span>
		</div>
		<div class="view-settings-content">
			<ui-setting label="Username">
				<ui-textbox :value="getSettingValue('username')" placeholder="username..." @input="eventInputUsername" />
			</ui-setting>

			<ui-setting label="Status">
				<ui-textbox :value="getSettingValue('status')" placeholder="status..." @input="eventInputStatus" />
			</ui-setting>

			<ui-setting label="Public Key">
				<span>
					{{ getSettingValue('publicKey') }}
				</span>
			</ui-setting>
			<ui-setting label="Private Key">
				<span>
					{{ getSettingValue('privateKey') }}
				</span>
			</ui-setting>
			<ui-setting>
				<ui-button color="primary" type="secondary" @click="eventRegenerateKeyPair">Regenerate Key Pair</ui-button>
			</ui-setting>

		</div>
		<div class="view-settings-footer">
			<ui-button color="green" type="primary" :disabled="saveButtonDisabled" @click="eventSaveSettings">Save</ui-button>
			<ui-button color="red" type="secondary" @click="eventClickCancel">cancel</ui-button>
			<ui-confirm ref="discardChangesModal" title="Discard changes" @confirm="$router.go(-1)">
				Do you want to discard all changes?
			</ui-confirm>
		</div>
	</div>
</template>
<script>
import UiSetting from "./ui/UiSetting";
import network from "../../main/network";
import { mapGetters } from "vuex";
import generateKey from "../../main/helper";

export default {

	name: "view-settings",

	components: {
		UiSetting,
	},

	data () {
		return {
			initialSettings: {},
			settings: {},
		};
	},

	mounted(){
		this.initialSettings = this.getSettings;
	},

	computed: {
		...mapGetters([
			"getSettings",
		]),
		settingss() {
			return this.settings;
		},
		saveButtonDisabled() {
			return Object.keys(this.settings).length === 0;
		},
	},

	methods: {
		getSettingValue(name) {
			if(Object.keys(this.settings).includes(name)){
				return this.settings[name];
			}
			return this.initialSettings[name];
		},
		setSettingValue(name, value) {
			if(value === this.initialSettings[name]){
				this.$delete(this.settings, name);
			}
			else {
				this.$set(this.settings, name, value);
			}
		},
		eventInputUsername(value) {
			this.setSettingValue("username", value);
		},
		eventInputStatus(value) {
			this.setSettingValue("status", value);
		},
		eventRegenerateKeyPair() {
			this.setSettingValue("publicKey", generateKey());
			this.setSettingValue("privateKey", generateKey());
		},
		eventSaveSettings(){
			this.$store.dispatch("settings", this.settings);
			network.sendUserUpdate(this.getPublicKey, this.username, "das ist ein status");
			this.$router.go(-1);
		},
		eventClickCancel(){
			if(!this.saveButtonDisabled){
				this.$refs.discardChangesModal.open();
			}
			else{
				this.$router.go(-1);
			}
		},
	},
};
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
	border-top-left-radius: 16px;
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