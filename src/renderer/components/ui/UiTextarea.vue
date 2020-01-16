<template>
	<div class="ui-textarea">
		<div ref="textarea" contenteditable="true" @input="eventInput" v-html="text">
		</div>
	</div>
</template>
<script>
export default {

	name: "ui-textarea",

	data() {
		return {
			text: "",
		};
	},

	computed: {
		textarea() {
			return this.$refs.textarea;
		},
	},

	methods: {
		handleInsertText(event) {
			this.text += `<p>${event.data}</p>`;
			event.preventDefault();
		},
		handleInsertParagraph(event) {
			this.text += "<p>t</p>";
			event.preventDefault();
		},
		handleDeleteContent(event) {
			console.log(this.textarea.childNodes);
			this.textarea.childNodes.splice(this.textarea.childNodes.length - 1, 1)
		},
		handleInsertFromPaste(event) {

		},
		handleDeleteByCut(event) {

		},
		eventInput(event) {
			console.log(event);
			switch(event.inputType) {
				case "insertText":
					this.handleInsertText(event);
					break;
				case "insertParagraph":
					this.handleInsertParagraph(event);
					break;
				case "deleteContentBackward":
					this.handleDeleteContent(event);
					break;
				case "insertFromPaste":
					this.handleInsertFromPaste(event);
					break;
				case "deleteByCut":
					this.handleDeleteByCut(event);
					break;
			}
		},
		eventKeydown(event) {
			console.log(event);
			//console.log(this.textarea);
			if(event.key === "Tab") {//Tab
				event.preventDefault();
			}
		},
	},
};
</script>
<style lang="less" scoped>

.ui-textarea {
	white-space: pre;
	flex-grow: 1;
	padding: 8px;
	min-width: 200px;
	background-color: gray;
	border: 1px solid red;
	& * {

	}
}

</style>