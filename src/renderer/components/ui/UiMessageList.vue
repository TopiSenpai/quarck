<template>
    <div class="ui-message-list" ref="messageList">
        <ui-message v-for="message in messages" :key="message.time" ref="messages" :message="message" />
    </div>
</template>

<script>
import UiMessage from "./UiMessage";

export default {

    name: "ui-message-list",

    props: {
        messages: {
            required: true,
            type: Array,
        },
    },

    components: {
        UiMessage,
    },

    mounted(){
        let list = this.$refs.messageList;
        list.scrollTop = list.scrollHeight;
    },

    updated() {
        this.$nextTick(() => {
            if(this.messages.length > 1) {
                let list = this.$refs.messageList;
                if(list.scrollTop >= list.scrollHeight - list.clientHeight - this.$refs.messages[this.$refs.messages.length - 1].$el.clientHeight) {
                    list.scrollTop = list.scrollHeight;
                }
            }
        });
    },

};
</script>

<style lang="less" scoped>
@import '../../style/colors.less';

.ui-message-list {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: auto;
    user-select: text;
}

</style>