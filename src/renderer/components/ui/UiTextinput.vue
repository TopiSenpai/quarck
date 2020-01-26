<template>
	<div class="ui-textinput">
		<ui-textbox ref="textarea" v-model="text" :multiLine="multiLine" :rows="1" :autofocus="true" :placholder="placeholder" @keydown="eventKeydown" />
	</div>
</template>
<script>
export default {

	name: "ui-textinput",

	props: {
		placeholder: {
			required: false,
			type: String,
			default: "Type Text...",
		},
		multiLine: {
			required: false,
			type: Boolean,
			default: true,
		},
	},

	data() {
		return {
			text: "",
		};
	},

	methods: {
		eventKeydown(event) {
			if(event.keyCode === 13) {
				if((this.multiLine && !event.shiftKey) || (!this.multiLine)) {
					event.preventDefault();
					let msg = this.text.trim();
					if(msg.length > 0) {
						this.text = "";
						this.$nextTick(() => {
							this.$refs.textarea.refreshSize();
						});
						this.$emit("send", msg);
					}
				}
			}
			else if(event.keyCode === 9) {
				event.preventDefault();
				let el = event.path[0];
				var s = el.selectionStart;
				this.text = this.text.substring(0, el.selectionStart) + "\t" + this.text.substring(el.selectionEnd);
				el.selectionEnd = s + 1;
			}
		},
	},
};
</script>
<style lang="less" scoped>
@import '../../style/style.less';

/deep/ .ui-textbox {
	margin-bottom: 0;
	&__textarea {
		color: @fc;
		border-bottom: 0!important;
		max-height: 30vh;
		font-size: 18px;
	}
}

.ui-textinput {
	flex-grow: 1;
}

</style>