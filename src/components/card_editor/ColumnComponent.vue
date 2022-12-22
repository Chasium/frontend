<template>
    <div class="main-row">
        <div class="area-container" v-for="item in columnObj.areas">
            <AreaComponent
                :can-edit="canEdit"
                :area="item"
                :scripts="scripts"
                @init="onPropertyInit"
                @edit="onPropertyEdit"
            />
        </div>
    </div>
</template>

<script lang="ts">
import type { IPropertyComponent } from '@/component_logics/CardEditor';
import type { Column } from '@/trpg/card_template/v2/Column';
import { defineComponent } from 'vue';
import AreaComponent from './AreaComponent.vue';

export default defineComponent({
    props: {
        canEdit: {
            type: Boolean,
            default: false,
        },
        column: {
            type: Object,
            required: true,
        },
        scripts: {
            type: Object,
            required: true,
        },
    },
    components: {
        AreaComponent,
    },
    computed: {
        columnObj(): Column {
            return this.column as Column;
        },
    },
    emits: {
        init(id: number, property: IPropertyComponent) {
            return id > 0 && property != null;
        },
        edit(value: any, id: number) {
            return value != null && id > 0;
        },
    },
    methods: {
        onPropertyInit(id: number, property: IPropertyComponent) {
            this.$emit('init', id, property);
        },
        onPropertyEdit(value: any, id: number) {
            this.$emit('edit', value, id);
        },
    },
});
</script>
