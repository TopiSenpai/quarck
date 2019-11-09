<template>
	<div class="ui-sidebar">
		<div><router-link to="/public_chat">Public Chat</router-link></div>
		<div v-for="server in servers" :key="server.url">
			<span>{{ server.name }}</span>
		</div>
	</div>
</template>

<script>
export default {
	name: "ui-sidebar",

	props: {
		servers: {
			required: true,
			type: Array
		}
	}
};
</script>

<style lang="less" scoped>
.ui-sidebar {
	display: flex;
	flex-direction: column;
	width: 100px;
	background-color: #262626;
}
</style>