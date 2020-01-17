<template>
    <div class="ui-messagebox">
        <ui-icon-button icon="attach_file" type="secondary" />
        <ui-textinput class="ui-messagebox-textinput" @send="eventSendMessage" />
        <ui-icon-button icon="insert_emoticon" type="secondary" />
    </div>
</template>

<script>
import UiTextinput from "./UiTextinput";

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
        UiTextinput,
    },

    methods: {
        eventSendMessage (text) {
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
    align-items: flex-start;
    flex-shrink: 0;
	margin: 20px;
	padding: 8px;
	border-radius: 12px;
	background-color: @box;
	& .ui-textinput {
        flex-grow: 1;
        margin-left: 4px;
		margin-right: 4px;
		margin-top: 0;
        margin-bottom: 0;
        align-self: center;
    }
}

</style>