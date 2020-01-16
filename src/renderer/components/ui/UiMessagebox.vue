<template>
    <div class="ui-messagebox">
        <ui-icon-button icon="attach_file" type="secondary" />
        <ui-textbox v-model="text" :placeholder="placeholder" :multiLine="true"  />
        <ui-icon-button icon="send" type="secondary" @click="eventMessage"/>
    </div>
</template>

<script>
import emoji from "node-emoji";

export default {

    name: "ui-messagebox",

    props: {
        placeholder: {
            required: false,
            type: String,
            default: "",
        },
    },

    data () {
        return {
            text: "",
            emojiIcon: emoji.random().emoji,
        };
    },

    methods: {
        eventMessage () {
            let text = this.text.trim();
            if(text !== ""){
                this.$emit("message", this.text);
                this.text = "";
            }
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