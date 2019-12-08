<template>
    <div class="ui-list">
        <slot name="header" v-if="title" class="ui-list-header">
            <span>{{ title }}</span>
        </slot>
        <slot class="ui-list-body">
            <div v-for="entry in entries" :key="entry[id]">{{ entry[label] }}</div>
        </slot>
    </div>
</template>

<script>
import UiUser from './UiUser'

export default {

    name: 'ui-user-list',

    props: {
        entries: {
            required: true,
            type: Array
        },
        label: {
            required: false,
            type: String,
            default: 'name'
        },
        id: {
            required: false,
            type: String,
            default: 'key'
        },
        
        title: {
            required: false,
            type: String,
            default: ''
        }
    },
    
    components: {
        UiUser
    }

}
</script>

<style lang="less" scoped>
@import '../../colors.less';

.ui-list {
    display: flex;
    flex-direction: column;
    width: 200px;
    background-color: @list;
    
    padding: 8px;
    &-header {
        padding: 8px;
        font-size: 200%;
    }
    &-body {
        padding: 8px;
        overflow-y: auto;
    }
}

</style>