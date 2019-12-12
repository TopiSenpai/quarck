<template>
    <div class="ui-window-toolbar">
        <div class="ui-window-toolbar-container">
            <!-- <img class="ui-window-toolbar-title-icon" src="../assets/logo.png" /> -->
            <span class="ui-window-toolbar-title">quarrck</span>
        </div>
        <div class="ui-window-toolbar-container">
            <button class="ui-window-toolbar-icon" @click="minimizeWindow">
                <svg name="TitleBarMinimize" aria-hidden="false" width="12" height="12" viewBox="0 0 12 12">
                    <rect fill="currentColor" width="10" height="1" x="1" y="6"></rect>
                </svg>
            </button>
            <button class="ui-window-toolbar-icon" @click="maximizeWindow">
                <svg name="TitleBarMaximize" aria-hidden="false" width="12" height="12" viewBox="0 0 12 12">
                    <rect width="9" height="9" x="1.5" y="1.5" fill="none" stroke="currentColor"></rect>
                </svg>
            </button>
            <button class="ui-window-toolbar-icon close-icon" @click="closeWindow">
                <svg name="TitleBarClose" aria-hidden="false" width="12" height="12" viewBox="0 0 12 12">
                    <polygon fill="currentColor" fill-rule="evenodd" points="11 1.576 6.583 6 11 10.424 10.424 11 6 6.583 1.576 11 1 10.424 5.417 6 1 1.576 1.576 1 6 5.417 10.424 1"></polygon>
                </svg>
            </button>
        </div>
    </div>    
</template>
<script>
const { BrowserWindow } = require('electron').remote

export default {
    name: 'ui-window-toolbar',

    methods: {
        minimizeWindow () {
            BrowserWindow.getFocusedWindow().minimize()
        },
        maximizeWindow () {
            let window = BrowserWindow.getFocusedWindow()
            if(window.isMaximized()){
                window.unmaximize()
            }
            else{
                window.maximize()
            }
        },
        closeWindow () {
            BrowserWindow.getFocusedWindow().close()
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../colors.less';

.ui-window-toolbar {
    flex-shrink: 0;
    display: flex;
    height: 22px;
    width: 100%;
    margin-top: 2px;
    -webkit-app-region: drag;
    background-color: @toolbar;
    user-select: none;
    justify-content: space-between;
    &-container {
        display: flex;
    }
    &-icon {
        width: 22px;
        height: 22px;
        border: none;
        padding: 0;
        color: @icon;
        background-color: @toolbar;
        -webkit-app-region: no-drag;
        cursor: pointer;
        outline: none;
        &:hover {
            background-color: @toolbar-hover;
            &.close-icon {
                background-color: red;
            }
        }
        & svg {
            margin: 5px;
        }
    }
    &-title {
        margin-left: 4px;
        height: 22px;
        cursor: default;
        &-icon {
            width: 22px;
            height: 22px;
        }
    }
}

</style>