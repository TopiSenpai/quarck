<template>
    <div class="ui-setting">
        <div class="ui-setting-label">
            <slot name="label">
                <span class="ui-setting-label-text">
                    {{ label }}
                </span>
            </slot>
        </div>
        <div class="ui-setting-setting">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {

    name: "ui-setting",

    props: {
        label: {
            required: false,
            type: String,
            default: "",
        },
    },
};
</script>

<style lang="less" scoped>
@import '../../colors.less';

/deep/ .ui-textbox__input {
    color: @fc;
}

.ui-setting {
    display: flex;
    padding: 8px;
    &-label {
        display: flex;
        flex-direction: column;
        padding: 8px;
        width: 150px;
        &-text {
            padding: 8px;
            font-weight: bold;
        }
    }
    &-setting {
        display: flex;
        flex-direction: column;
        padding: 8px;
        max-width: 600px;
    }
}

</style>