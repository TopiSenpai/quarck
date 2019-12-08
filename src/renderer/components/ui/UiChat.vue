<template>
    <div class="ui-chat">
        <router-link class="ui-chat-link" :to="`/chats/${chat.name}`">
            <span class="ui-chat-text">{{ chat.name }}</span>
        </router-link>
    </div>
</template>

<script>
export default {

    name: 'ui-chat',

    props: {
        chat: {
            required: true,
            type: Object
        }
    }
}
</script>

<style lang="less" scoped>

.ui-chat {
    padding: 8px;
    &-link {
        flex-grow: 1;
    }
    &-text {
        color: white;
        text-decoration: none;
    }
}

</style>