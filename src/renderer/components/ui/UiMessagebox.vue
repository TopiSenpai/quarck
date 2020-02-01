<template>
    <div class="ui-messagebox">
        <ui-icon-button icon="attach_file" type="secondary" />
        <div class="ui-messagebox-editor">
            <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
                <div>
                    <button :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
                        Bold
                    </button>
                    <button :class="{ 'is-active': isActive.heading({ level: 1 }) }" @click="commands.heading({ level: 1 })">
                        Header
                    </button>
                </div>
            </editor-menu-bar>
            <editor-content class="ui-messagebox-editor-editor" :editor="editor" />
        </div>
        <ui-icon-button icon="insert_emoticon" type="secondary" />
    </div>
</template>

<script>
import { Editor, EditorMenuBar, EditorContent} from "tiptap";
import { Blockquote, CodeBlock, HardBreak, Heading, OrderedList, BulletList, ListItem, TodoItem, TodoList, Bold, Code, Italic, Link, Strike, Underline, History } from "tiptap-extensions";
export default {

    name: "ui-messagebox",

    props: {
        placeholder: {
            required: false,
            type: String,
            default: "",
        },
    },

    data() {
        return {
            editor: null,
        };
    },

    components: {
        EditorContent,
        EditorMenuBar,
    },

    mounted() {
        this.editor = new Editor({
            extensions: [
                new Blockquote(),
                new CodeBlock(),
                new HardBreak(),
                new Heading({ levels: [1] }),
                new BulletList(),
                new OrderedList(),
                new ListItem(),
                new TodoItem(),
                new TodoList(),
                new Bold(),
                new Code(),
                new Italic(),
                new Link(),
                new Strike(),
                new Underline(),
                new History(),
            ],
            content: "<p>test</p>",
        });
    },

    beforeDestroy(){
        this.editor.destroy();
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
    & * {
        flex-shrink: 0;
    }
    &-editor {
        flex-shrink: 1;
        flex-grow: 1;
        margin-left: 4px;
		margin-right: 4px;
		margin-top: 0;
        margin-bottom: 0;
        align-self: center;
        &-editor {
            
        }
    }
}

</style>