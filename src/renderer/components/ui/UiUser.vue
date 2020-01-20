
<template>
    <div class="ui-user">
        <img class="ui-user-icon" src="../../assets/avatar.png"/>
        <div class="ui-user-name">
            <span class="ui-user-name-name">{{ user.username }}</span>
            <span class="ui-user-name-status">{{ user.status }}</span>
        </div>
    </div>
</template>

<script>
export default {

    name: "ui-user",

    props: {
        user: {
            required: true,
            type: Object,
        },
    },
};
</script>

<style lang="less" scoped>
@import '../../style/style.less';

.ui-user {
    .flexRow;
    align-items: center;
    padding-left: 8px;
    padding-top: 4px;
    padding-right: 8px;
    padding-bottom: 4px;
    &-icon {
        width: 40px;
        height: 40px;
        margin-right: 8px;
    }
    &-name {
        .flexColumn;
        &-name {
            font-weight: bold;
            text-overflow: ellipsis;
        }
        &-status {
            color: @fc-dark;
            font-size: @fs-small;
        }
        &-key {
            font-size: 60%;
            color: gray;
        }
    }
}
</style>