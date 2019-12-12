<template>
    <div class="ui-message-list">
        <ui-message v-for="message in messages" :key="message.time" :message="message" />
    </div>
</template>

<script>
import UiMessage from './UiMessage'

export default {

    name: 'ui-message-list',

    props: {
        messages: {
            required: true,
            type: Array
        }
    },

    components: {
        UiMessage
    }

}
</script>

<style lang="less" scoped>
@import '../../colors.less';

.ui-message-list {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: auto;
    user-select: text;
}

</style>