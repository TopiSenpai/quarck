<template>
	<div class="view-settings">
		<div class="view-settings-header">
			<span>Settings</span>
		</div>
		<div class="view-settings-content">
			<div class="view-settings-content-account">
				<ui-image-picker v-model="avatar" width="150px" height="150px" @input="eventInputAvatar"/>
				<div class="view-settings-content-account-textboxes">
					<ui-textbox :value="getSettingValue('username')" label="Username" placeholder="username..." @input="eventInputUsername" />
					<ui-textbox :value="getSettingValue('status')" label="Status" placeholder="status..." @input="eventInputStatus" />
				</div>
			</div>
			<br />
			<ui-setting label="Public Key">
				<span style="user-select: all">
					{{ getSettingValue('publicKey') }}
				</span>
			</ui-setting>
			<ui-setting label="Private Key">
				<div class="private-key" :class="{ hide: hidePrivateKey }">
					<ui-icon-button type="secondary" :icon="privateKeyIcon" size="mini" @click="toggleHidePrivateKey" />
					<span>{{ getSettingValue('privateKey') }}</span>
				</div>
			</ui-setting>
			<ui-setting>
				<ui-button color="primary" type="secondary" @click="eventRegenerateKeyPair">Regenerate Key Pair</ui-button>
			</ui-setting>
		</div>
		<div class="view-settings-footer">
			<ui-button color="green" type="primary" :disabled="saveButtonDisabled" @click="eventSaveSettings">Save</ui-button>
			<ui-button color="red" type="secondary" @click="eventClickCancel">cancel</ui-button>
			<ui-confirm ref="discardChangesModal" title="Discard changes" @confirm="back">
				Do you want to discard all changes?
			</ui-confirm>
		</div>
	</div>
</template>
<script>
import UiSetting from "./ui/UiSetting";
import UiImagePicker from "./ui/UiImagePicker";
import network from "../../main/network";
import { mapGetters } from "vuex";
import generateKey from "../../main/helper";

export default {

	name: "view-settings",

	components: {
		UiSetting,
		UiImagePicker,
	},

	data () {
		return {
			initialSettings: {},
			settings: {},
			avatar: {},
			hidePrivateKey: true,
			privateKeyIcon: "visibility_off",
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
		toggleHidePrivateKey() {
			this.hidePrivateKey = !this.hidePrivateKey;
			if(this.hidePrivateKey) {
				this.privateKeyIcon = "visibility_off";
			}
			else{
				this.privateKeyIcon = "visibility";
			}
		},
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
		eventInputAvatar(value) {
			this.avatar = value;
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
			network.sendUserUpdate(this.getSettingValue("publicKey"), this.getSettingValue("username"), this.getSettingValue("status"));
			this.back();
		},
		eventClickCancel(){
			if(!this.saveButtonDisabled){
				this.$refs.discardChangesModal.open();
			}
			else{
				this.back();
			}
		},
		back() {
			this.$router.go(-1);
		},
	},
};
</script>
<style lang="less" scoped>
@import '../style/style.less';

.private-key{
	.flexRow;
	padding: 8px;
	border-radius: 8px;
	background-color: darken(@primary, 5%);
	.ui-icon-button {
		flex-shrink: 0;
	}
	&.hide {
		color: darken(@primary, 5%);
	}
}

.view-settings{
	.flexColumn;
	background-color: @primary;
	border-top-left-radius: 16px;
	&-header {
		.flexRow;
		align-items: center;
		justify-content: space-between;
		padding: 16px;
		font-size: 150%;
		font-weight: bold;
		border-bottom: 1px solid #2b2b2b;
	}
	&-content{
		.flexColumn;
		padding: 16px;
		flex-grow: 1;
		border-bottom: 1px solid #2b2b2b;
		&-account {
			.flexRow;
			padding: 16px;
			border-radius: 16px;
			border: 1px solid darken(@primary, 5%);
			background-color: darken(@primary, 2%);
			&-textboxes {
				.flexColumn;
				padding: 16px;
				margin-left: 16px;
			}
		}
	}
	&-footer {
		.flexRow;
		justify-content: space-between;
		padding: 16px;
	}
}
</style>