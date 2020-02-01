<template>
	<!-- <ui-textbox ref="textarea" v-model="text" :multiLine="multiLine" :rows="1" :autofocus="true" :placholder="placeholder" @keydown="eventKeydown" /> -->
	<div class="ui-textinput" contenteditable="true" ref="textarea" @keydown="eventKeydown" >
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
	},

	data() {
		return {
			text: "",
		};
	},

	methods: {
		eventKeydown(event) {
			if(event.keyCode === 13) {
				if(!event.shiftKey) {
					event.preventDefault();
					let msg = event.target.innerText.trim();
					if(msg.length > 0) {
						event.target.innerText = "";
						this.$emit("send", msg);
					}
				}
			}
			else if(event.keyCode === 9) {
				event.preventDefault();
				let el = event.target;
				let html = event.target.innerText;
				let selection = window.getSelection();
				console.log(selection);
				console.log(selection.anchorOffset);
				el.innerHTML = html.substring(0, selection.anchorOffset) + "\t" + html.substring(selection.anchorOffset);
				//selection.anchorOffset = selection.anchorOffset + 1;
				window.setSelectionRange(1, 5);
			}
		},
		parseMArkupPreview() {

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
	max-height: 300px;
	overflow-y: auto;
	overflow-x: hidden;
	white-space: pre-wrap;
	word-wrap: break-word;
	word-break: break-all;
}

</style>