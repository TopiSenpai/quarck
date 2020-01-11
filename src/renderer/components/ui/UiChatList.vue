<template>
    <div class="ui-chat-list">
        <div class="ui-chat-list-header">
            <span>Chats</span>
            <ui-icon-button icon="person_add" type="secondary" color="white" @click="openAddChatModal" />
        </div>
        <ui-chat v-for="chat in chats" :key="chat.hash" :chat="chat" />
        <ui-modal ref="add_chat">
            <ui-textbox v-model="chatName" label="Chat Name" />
            <multiselect :multiple="true" :hideSelected="true" :close-on-select="false" :clear-on-select="false" v-model="selectedUsers" :options="getUsers" placeholder="select user" label="username" track-by="username"/>
            <br />
            <br />
            <ui-button color="green" @click="createChat">create</ui-button>
        </ui-modal>
    </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import UiChat from "./UiChat";
import generateKey from "../../../main/helper";
import { mapGetters } from "vuex";
import "vue-multiselect/dist/vue-multiselect.min.css";
export default {

    name: "ui-chat-list",

    props: {
        chats: {
            required: true,
            type: Array,
        },
    },

    data(){
        return {
            chatName: "",
            selectedUsers: [],
        };
    },

    components: {
        UiChat,
        Multiselect,
    },

    computed: {
        ...mapGetters([
			"getUsers",
		]),
    },

    methods: {
        openAddChatModal(){
            this.chatName = "";
            this.selectedUsers = [];
            this.$refs.add_chat.open();
        },
        createChat(){
            this.$store.dispatch("chat", {
                name: this.chatName,
                id: generateKey(),
                messages: [],
                users: this.selectedUsers,
            });
            this.$refs.add_chat.close();
            this.chatName = "";
            this.selectedUsers = [];
        },
    },

};
</script>

<style lang="less" scoped>
@import '../../colors.less';


.ui-chat-list {
    display: flex;
    flex-direction: column;
    width: 250px;
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