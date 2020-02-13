<template>
    <div class="ui-user-list">
        <ui-user v-for="user in users" :key="user.key" :user="user" />
    </div>
</template>

<script>
import UiUser from "./UiUser";

export default {

    name: "ui-user-list",

    props: {
        users: {
            required: true,
            type: Array,
        },
    },

    components: {
        UiUser,
    },

};
</script>

<style lang="less" scoped>
@import '../../style/style.less';

.ui-user-list {
    .flexColumn;
    flex-shrink: 0;
    width: 200px;
    padding: 8px;
    background-color: @list;
    overflow-y: auto;
}

</style>