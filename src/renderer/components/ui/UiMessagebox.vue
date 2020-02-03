<template>
    <div class="ui-messagebox">
        <ui-icon-button icon="attach_file" type="secondary" />
        <div class="ui-messagebox-editor" :class="{ show: !getShowEditorbar }">
            <div id="editor" class="ui-messagebox-editor-container">
                <textarea ref="editor"></textarea>
            </div>
            <!-- <ui-icon-button class="show-editorbar" type="secondary" :icon="getShowEditorbar ? 'arrow_drop_down' : 'arrow_drop_up'" size="tiny" @click="toggleShowEditorbar" /> -->
        </div>
        <ui-icon-button icon="insert_emoticon" type="secondary" />
    </div>
</template>

<script>
//import SimpleMDE from "simplemde";
import "simplemde/dist/simplemde.min.css";
import { mapGetters } from "vuex";
//import "jquery.min.js";
import editormd from "editor.md/editormd.min.js";
import Zepto from "zepto";

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
        this.editor = editormd("editor", {
            path : "editor.md/lib/",
        });
        // this.editor = new SimpleMDE({
        //     element: this.$refs.editor,
        //     autofocus: true,
        //     toolbar: [
        //         {
        //             name: "bold",
        //             action: SimpleMDE.toggleBold,
        //             className: "fa fa-bold",
        //             title: "Bold",
        //         },
        //         {
        //             name: "italic",
        //             action: SimpleMDE.toggleItalic,
        //             className: "fa fa-italic",
        //             title: "Italic",
        //         },
        //         {
        //             name: "strikethrough",
        //             action: SimpleMDE.toggleStrikethrough,
        //             className: "fa fa-strikethrough",
        //             title: "Strikethrough",
        //         },
        //         {
        //             name: "heading-1",
        //             action: SimpleMDE.toggleHeading1,
        //             className: "fa fa-header fa-header-x fa-header-1",
        //             title: "Big Heading",
        //         },
        //         "|",
        //         {
        //             name: "code",
        //             action: SimpleMDE.toggleCodeBlock,
        //             className: "fa fa-code",
        //             title: "Code",
        //         },
        //         {
        //             name: "quote",
        //             action: SimpleMDE.toggleCodequote,
        //             className: "fa fa-quote-left",
        //             title: "Quote",
        //         },
        //     ],
        // });
    },

    computed: {
        ...mapGetters([
            "getShowEditorbar",
        ]),
    },

    methods: {
        eventSendMessage (text) {
            this.$emit("message", text);
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
    flex-grow: 0;
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
            flex-grow: 1;
        }
        &.show /deep/.editor-toolbar {
            display: none;
        }
    }
}

</style>