<template>
    <div class="ui-chat">
        <router-link class="ui-chat-link" :to="`/chats/${chat.name}`">
            {{ chat.name }}
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
    display: flex;
    padding: 8px;
    &-link {
        border-radius: 8px;
        padding: 8px;
        flex-grow: 1;
        text-decoration: none;
        color: white;
        &:hover {
            background-color: #262626;
        }
    }
}

</style>