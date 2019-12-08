<template>
    <div class="ui-user-list">
        <div class="ui-">

        </div>
        <ui-user v-for="user in users" :key="user.key" :user="user" />
    </div>
</template>

<script>
import UiUser from './UiUser'

export default {

    name: 'ui-user-list',

    props: {
        users: {
            required: true,
            type: Array
        }
    },
    
    components: {
        UiUser
    }

}
</script>

<style lang="less" scoped>
@import '../../colors.less';

.ui-user-list {
    display: flex;
    flex-direction: column;
    width: 200px;
    background-color: @list;
    overflow-y: auto;
}

</style>