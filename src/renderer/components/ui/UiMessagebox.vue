<template>
    <div class="ui-messagebox">
        <ui-icon-button icon="attach_file" color="white" />
        <ui-textbox v-model="text" :placeholder="placeholder" @keydown-enter="eventMessage" />
        <button class="emoji-button" @click="eventClickEmoji">
            {{ emojiIcon }}
        </button>
    </div>
</template>

<script>
import emoji from 'node-emoji'
import UiEmoji from './UiEmoji'

export default {

    name: 'ui-messagebox',
    
    props: {
        placeholder: {
            required: false,
            type: String,
            default: ''
        }
    },

    components: {
        UiEmoji
    },

    data () {
        return {
            text: '',
            emojiIcon: emoji.random().emoji
        }
    },

    methods: {
        eventMessage () {
            let text = this.text.trim()
            if(text !== ''){
                this.$emit('message', this.text)
                this.text = ''
            }
        },
        eventClickEmoji(value){
            this.emojiIcon = emoji.random().emoji
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../colors.less';

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
	margin: 20px;
	padding: 8px;
    display: flex;
    flex-shrink: 0;
	border-radius: 20px;
	background-color: @box;
    align-items: center;
	& .ui-textbox {
        flex-grow: 1;
        margin-left: 4px;
		margin-right: 4px;
		margin-top: 0;
		margin-bottom: 0;
	}
	& /deep/ .ui-textbox__input {
		color: @fc;
	}
}

</style>