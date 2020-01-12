<template>
    <div class="ui-user-list">
        <div class="ui-">

        </div>
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
@import '../../style/colors.less';

.ui-user-list {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 200px;
    padding-top: 8px;
    padding-bottom: 8px;
    background-color: @list;
    overflow-y: auto;
}

</style>