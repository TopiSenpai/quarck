<template>
    <div class="ui-chat-list">
        <div class="ui-chat-list-header">
            <span>Chats</span>
        </div>
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
    border-top-left-radius: 16px;
    width: 200px;
    background-color: @list;
    flex-shrink: 0;
    &-header {
        display: flex;
        padding: 16px;
        border-bottom: 1px solid #2c2c2c;
    }
}

</style>