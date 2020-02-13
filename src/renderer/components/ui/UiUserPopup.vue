<template>
	<ui-popover class="ui-user-popup" open-on="click" :position="position" animation="shift-away">
		<div class="ui-user-popup-header">
			<img src="../../assets/avatar.png" />
			<span>{{ user.username }}</span>
		</div>
		<div class="ui-user-popup-body">
			<button>Open Chat</button>
			<button>Add Friend</button>
			<button>Remove Friend</button>
			<button>Block User</button>
		</div>
	</ui-popover>
</template>
<script>
import { mapGetters } from "vuex";

export default {

	name: "ui-user-popup",

	props: {
		user: {
			required: true,
			type: [Object, String],
		},
		position: {
			required: false,
			type: String,
			default: "bottom-start",
		},
	},

	computed: {
		...mapGetters([
			"isFriend",
			"isOnline",
		]),
	},
};
</script>
<style lang="less" scoped>
@import '../../style/style.less';



.ui-user-popup {
	.flexColumn;
	border-radius: 8px;
	min-width: 200px;
	&-header {
		.bg-primary;
		.flexColumn;
		align-items: center;
		padding: 8px;
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
		img {
			width: 60px;
			height: 60px;
		}
	}
	&-body {
		.flexColumn;
		padding: 8px;
		border-bottom-left-radius: 8px;
		border-bottom-right-radius: 8px;
		.bg-secondary;
		& * {
			color: @fc;
			padding: 4px;
			border-radius: 4px;
			background-color: @secondary;
			border: 0;
			&:hover {
				background-color: darken(@secondary, 5%);
			}
		}
	}
}

</style>