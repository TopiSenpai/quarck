<template>
    <div class="ui-messagebox">
        <ui-icon-button icon="attach_file" type="secondary" />
        <!-- <ui-textbox v-model="text" :placeholder="placeholder" :multiLine="true"  /> -->
        <ui-textarea @send="eventSendMessage" />
        <ui-icon-button icon="insert_emoticon" type="secondary" @click="eventMessage"/>
    </div>
</template>

<script>
import UiTextarea from "./UiTextarea";

export default {

    name: "ui-messagebox",

    props: {
        placeholder: {
            required: false,
            type: String,
            default: "",
        },
    },

    components: {
        UiTextarea,
    },

    methods: {
        eventMessage (text) {
            this.$emit("message", text);
        },
    },
};
</script>

<style lang="less" scoped>
@import '../../style/style.less';

.emoji-button {
    margin: 0;
    padding: 0;
    width: 36px;
    height: 36px;
    font-size: 20px;
    background-color: transparent;
    border: 0;
}

.ui-messagebox {
    .flexRow;
    align-items: center;
    flex-shrink: 0;
	margin: 20px;
	padding: 8px;
	border-radius: 12px;
	background-color: @box;
	& .ui-textbox {
        flex-grow: 1;
        margin-left: 4px;
		margin-right: 4px;
		margin-top: 0;
		margin-bottom: 0;
	}
}

</style>