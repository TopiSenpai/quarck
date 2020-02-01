<template>
	<ui-popover class="ui-user-popup" open-on="click">
		<div class="ui-user-popup-header">
			<img src="../../assets/avatar.png" />
			<span>{{ user.username }}</span>
		</div>
		<div class="ui-user-popup-body">
			<div>Open Chat</div>
			<div>Add Friend</div>
			<div>Remove Friend</div>
			<div>Block User</div>
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
	&-header {
		.bg-primary;
		.flexColumn;
		align-items: center;
		padding: 8px;
		img {
			width: 50px;
			height: 50px;
		}
	}
	&-body {
		.flexColumn;
		padding: 8px;
		.bg-secondary;
		& * {
			padding: 4px;
			border-radius: 4px;
			&:hover {
				background-color: darken(@secondary, 5%);
			}
		}
	}
}

</style>