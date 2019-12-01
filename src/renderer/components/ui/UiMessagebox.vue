<template>
    <div class="ui-messagebox">
        <ui-icon-button icon="attach_file" color="white" />
        <ui-textbox v-model="text" :placeholder="placeholder" @keydown-enter="eventMessage" />
        <ui-icon-button icon="insert_emoticon" color="white" />
    </div>
</template>

<script>
import { UiTextbox, UiIconButton } from 'keen-ui'

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
        UiTextbox,
        UiIconButton
    },

    data () {
        return {
            text: ''
        }
    },

    methods: {
        eventMessage () {
            this.$emit('message', this.text)
            this.text = ''
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../colors.less';

.ui-messagebox {
	margin: auto;
	margin-top: 10px;
	margin-bottom: 10px;
	width: 90%;
	padding: 8px;
	display: flex;
	border-radius: 20px;
	background-color: #414447;
	align-items: center;
	& .ui-textbox {
		flex-grow: 1;
	}
	& /deep/ .ui-textbox__input {
		color: @fc-default;
	}
	& > * {
		margin-left: 4px;
		margin-right: 4px;
		margin-top: 0;
		margin-bottom: 0;
	}
}

</style>