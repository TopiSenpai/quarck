<template>
    <div class="ui-chat">
        <span>#{{ chat.name }}</span>
        <span>{{ chat.id }}</span>
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
    border-bottom: 1px solid red;
}

</style>