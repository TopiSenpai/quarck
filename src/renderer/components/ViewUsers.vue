<template>
	<div class="view-users">
		<h1>Users</h1>
		<ui-user-list :users="users" />
	</div>
</template>
<script>
import UiUserList from "./ui/UiUserList";
import { mapGetters } from "vuex";

export default {

	name: "view-users",

	components: {
		UiUserList,
	},

	computed: {
		...mapGetters([
			"getUsers",
		]),
		users(){
			return this.getUsers;
		},
	},
};
</script>
<style lang="less" scoped>

</style>