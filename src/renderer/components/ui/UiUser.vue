
<template>
    <div class="ui-user">
        <img class="ui-user-icon" :src="user.icon"/>
        <div class="ui-user-name">
            <span>{{ user.name }}</span>
            <span>{{ user.hash }}</span>
        </div>
    </div>
</template>

<script>
export default {

    name: 'ui-user',

    props: {
        user: {
            required: true,
            type: Object
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../colors.less';

.ui-user {
    display: flex;
    &-icon {
        width: 30px;
        height: 30px;
    }
    &-name {
        display: flex;
        flex-direction: column;
    }
}
</style>