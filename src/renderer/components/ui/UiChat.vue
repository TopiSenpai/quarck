<template>
    <div class="ui-chat" :class="{ selected: selected }">
        <router-link class="ui-chat-link" :to="`/chat/${chat.id}`">
            {{ chat.name }}
        </router-link>
        <ui-icon-button v-if="chat.id !== 'public'" class="ui-chat-close" icon="clear" type="secondary" size="mini" @click="removeChat" />
    </div>
</template>

<script>
export default {

    name: "ui-chat",

    props: {
        chat: {
            required: true,
            type: Object,
        },
        selected: {
            required: false,
            type: Boolean,
            default: false,
        },
    },

    methods: {
        removeChat(){
            this.$store.dispatch("removeChat", this.chat.id);
        },
    },

};
</script>

<style lang="less" scoped>
@import '../../style/style.less';

.ui-chat {
    .flexRow;
    justify-content: space-between;
    align-items: center;
    margin-left: 8px;
    margin-top: 2px;
    margin-right: 8px;
    border-radius: 8px;
    &:hover,
    &.selected {
        background-color: @list-dark;
    }
    &:hover .ui-chat-close {
        display: block;
    }
    &-link {
        padding: 8px;
        flex-grow: 1;
        text-decoration: none;
        color: @fc;
    }
    &-close {
        margin-right: 8px;
        display: none;
        /deep/ .ui-icon {
            color: @icon-dark;
        }
    }
}

</style>