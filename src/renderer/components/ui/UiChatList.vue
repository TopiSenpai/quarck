<template>
    <div class="ui-chat-list">
        <div class="ui-chat-list-header">
            <span>Chats</span>
            <ui-icon-button icon="add" type="secondary" tooltip="Create Chat" tooltipPosition="top" @click="openAddChatModal" />
        </div>
        <ui-chat v-for="chat in chats" :key="chat.hash" :chat="chat" :selected="isSelected(chat.id)" />
        <ui-modal ref="add_chat" title="Create Chat">
            <ui-textbox v-model="chatName" label="Chat Name" />
            <ui-select v-model="selectedUsers" :options="getOtherUsers" valueProp="key" labelProp="username" />
            <ui-button color="green" @click="createChat">create</ui-button>
        </ui-modal>
    </div>
</template>

<script>
import UiSelect from "./UiSelect";
import UiChat from "./UiChat";
import generateKey from "../../../main/helper";
import { mapGetters } from "vuex";
import network from "../../../main/network";

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
        //Multiselect,
        UiSelect,
    },

    computed: {
        ...mapGetters([
			"getOtherUsers",
			"getPublicKey",
        ]),
        isDisabled() {
            return this.chatName.trim().length === 0 || this.selectedUsers.length === 0;
        },
    },

    methods: {
        isSelected(chat) {
            return this.$route.params.id === chat;
        },
        openAddChatModal(){
            this.chatName = "";
            this.selectedUsers = [];
            this.$refs.add_chat.open();
        },
        createChat(){
            network.sendAddChat({
                name: this.chatName,
                id: generateKey(),
                messages: [],
                users: this.selectedUsers.map(u => u.key).concat([this.getPublicKey]),
            });
            this.$refs.add_chat.close();
            this.chatName = "";
            this.selectedUsers = [];
        },
    },

};
</script>

<style lang="less" scoped>
@import '../../style/style.less';

.ui-chat-list {
    .flexColumn;
    width: 250px;
    background-color: @list;
    flex-grow: 1;
    flex-shrink: 0;
    &-header {
        .flexRow;
        justify-content: space-between;
        align-items: center;
        padding-top: 8px;
        padding-left: 16px;
        padding-right: 16px;
        border-top: 1px solid darken(@list, 2%);
        /deep/ .ui-icon {
            color: @icon-dark;
        }
    }
}

</style>