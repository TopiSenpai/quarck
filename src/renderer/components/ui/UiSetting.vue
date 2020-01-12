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
@import '../../style/colors.less';

.ui-setting {
    display: flex;
    padding: 8px;
    &-label {
        display: flex;
        flex-direction: column;
        padding: 8px;
        width: 150px;
        &-text {
            font-weight: bold;
        }
    }
    &-setting {
        display: flex;
        flex-direction: column;
        padding: 8px;
        min-width: 150px;
    }
}

</style>