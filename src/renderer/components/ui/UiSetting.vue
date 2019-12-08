<template>
    <div class="ui-setting">
        <span class="ui-setting-label">{{ label }}</span>
        <div class="ui-setting-setting">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {

    name: 'ui-chat',

    props: {
        label: {
            required: true,
            type: String
        }
    }
}
</script>

<style lang="less" scoped>

.ui-setting {
    display: flex;
    padding: 8px;
    &-label {
        padding: 8px;
        font-weight: bold;
    }
    &-setting {
        padding: 8px;
        max-width: 600px;
    }
}

</style>