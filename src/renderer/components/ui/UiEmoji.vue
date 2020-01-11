<template>
	<div class="ui-emoji">
		test
		<div class="ui-emoji-search">
			<ui-textbox />
		</div>
		<div class="ui-emoji-emojis">
			<div v-for="e in emojis" :key="e.key">
				{{e.emoji}}
			</div>
		</div>
	</div>
</template>
<script>
import emoji from "node-emoji";

export default {

	name: "ui-emoji",

	computed: {
		emojis() {
			return emoji.search("");
		},
	},
};
</script>

<style lang="less" scoped>

.ui-emoji {
	padding: 8px;
	width: 400px;
	height: 400px;
	overflow-y: hidden;
	&-emojis {
		display: flex;
		flex-wrap: wrap;
		overflow-y: scroll;
	}
}

</style>