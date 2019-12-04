
<template>
    <div class="ui-user">
        <img class="ui-user-icon" :src="user.icon"/>
        <div class="ui-user-name">
            <span class="ui-user-name-name">{{ user.name }}</span>
            
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
    align-items: center;
    padding: 8px;
    padding-top: 16px;
    padding-bottom: 16px;
    &-icon {
        width: 30px;
        height: 30px;
        margin-right: 8px;
    }
    &-name {
        display: flex;
        flex-direction: column;
        &-name {
            font-weight: bold;
        }
        &-key {
            font-size: 60%;
            color: gray;
        }
    }
}
</style>