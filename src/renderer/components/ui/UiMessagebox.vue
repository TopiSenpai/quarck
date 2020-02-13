<template>
    <div class="ui-messagebox">
        <ui-icon-button icon="attach_file" type="secondary" />
        <div class="ui-messagebox-editor" :class="{ show: !getShowEditorbar }">
            <div class="ui-messagebox-editor-container">
                <div class="ui-messagebox-editor-container-container">
                    <textarea ref="editor"></textarea>
                </div>
            </div>
            <ui-icon-button class="show-editorbar" type="secondary" :icon="getShowEditorbar ? 'arrow_drop_down' : 'arrow_drop_up'" size="tiny" @click="toggleShowEditorbar" />
        </div>
        <ui-icon-button icon="send" type="secondary" @click="eventSendMessage()" />
        <!-- <ui-icon-button icon="insert_emoticon" type="secondary" /> -->
    </div>
</template>

<script>
import SimpleMDE from "simplemde";
import { mapGetters } from "vuex";
import "simplemde/dist/simplemde.min.css";

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

    mounted() {
        this.editor = new SimpleMDE({
            element: this.$refs.editor,
            autofocus: true,
            spellChecker: false,
            tabSize: 4,
            autosave: {
                simplemde: false,
            },
            renderingConfig: {
                codeSyntaxHighlighting: true,
                status: false,
            },
            parsingConfig: {
                allowAtxHeaderWithoutSpace: true,
            },
            toolbar: ["bold", "italic", "strikethrough", "heading", "|", "code", "quote", "horizontal-rule", "|", "unordered-list", "ordered-list", "|", "image", "table", "|", "clean-block"],
            shortcuts: {
                toggleFullScreen: null,
                toggleSideBySide: null,
                togglePreview: null,
            },
        });
    },

    computed: {
        ...mapGetters([
            "getShowEditorbar",
        ]),
    },

    methods: {
        eventSendMessage () {
            this.$emit("message", this.editor.value());
            this.editor.value("");
        },
        toggleShowEditorbar() {
            this.$store.dispatch("showEditorbar", !this.getShowEditorbar);
        },
    },
};
</script>

<style lang="less" scoped>
@import '../../style/style.less';

/deep/ .CodeMirror {
    background-color: transparent;
    border: 1px solid transparent;
    .fc;
}
/deep/ .CodeMirror-selected {
    background-color: @select;
}
/deep/ .CodeMirror, /deep/ .CodeMirror-scroll {
	max-height: 300px;
    min-height: 0px;
}
/deep/ .CodeMirror-cursor {
    border-left: 1px solid @fc;
}
/deep/ .editor-toolbar {
    border: 1px solid transparent;
    border-radius: 4px;
    .bg-secondary;
    & a {
        &:hover,
        &.active {
            background-color: darken(@secondary, 5%);
            border: 1px solid transparent;
        }
        &::before {
            .fc;
        }
    }
}
/deep/ .editor-statusbar {
    display: none;
}

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
        display: flex;
        .flexRow;
        flex-shrink: 1;
        flex-grow: 1;
        &-container {
            display: block;
            max-width: 100%;
            &-container{
                display: block;
                max-width: 100%;
            }
        }
        &.show /deep/.editor-toolbar {
            display: none;
        }
    }
}

</style>