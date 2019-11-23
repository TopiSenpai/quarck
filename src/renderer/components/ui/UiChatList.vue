<template>
    <div class="ui-chat-list">
        <span class="ui-chat-list-header">Chat List</span>
        <ui-chat v-for="chat in chats" :key="chat.hash" :chat="chat" />
    </div>
</template>

<script>
import UiChat from './UiChat'

export default {

    name: 'ui-chat-list',

    props: {
        chats: {
            required: true,
            type: Array
        }
    },

    components: {
        UiChat
    }

}
</script>

<style lang="less" scoped>
@import '../../colors.less';

.ui-chat-list {
    display: flex;
    flex-direction: column;
    width: 200px;
    background-color: @list;
    &-header {
        padding: 8px;
    }
}

</style>