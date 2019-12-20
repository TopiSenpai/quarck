<template>
    <div class="ui-chat-list">
        <div class="ui-chat-list-header">
            <span>Chats</span>
            <ui-icon-button icon="person_add" type="secondary" color="white" @click="openAddChatModal" />
        </div>
        <ui-chat v-for="chat in chats" :key="chat.hash" :chat="chat" />
        <ui-modal ref="add_chat">
            <!-- //TODO user list to select user to create private chat -->
            <ui-button color="green">create</ui-button>
        </ui-modal>
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
    },

    methods: {
        openAddChatModal(){
            this.$refs.add_chat.open()
        }
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
    flex-grow: 1;
    flex-shrink: 0;
    &-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px;
        border-bottom: 1px solid #2c2c2c;
    }
}

</style>