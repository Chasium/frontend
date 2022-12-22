<template>
    <div class="main-col">
        <div class="property-container" v-for="property in rowObj.properties">
            <PropertyComponent
                :can-edit="canEdit"
                :template-property="property"
                :scripts="scripts"
                @init="onPropertyInit"
                @edit="onPropertyEdit"
            ></PropertyComponent>
        </div>
    </div>
</template>

<script lang="ts">
import type { IPropertyComponent } from '@/component_logics/CardEditor';
import type { Row } from '@/trpg/card_template/v2/Row';
import { defineComponent } from 'vue';
import PropertyComponent from './PropertyComponent.vue';

export default defineComponent({
    props: {
        canEdit: {
            type: Boolean,
            default: false,
        },
        row: {
            type: Object,
            required: true,
        },
        scripts: {
            type: Object,
            required: true,
        },
    },
    components: { PropertyComponent },
    computed: {
        rowObj() {
            return this.row as Row;
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
    emits: {
        init(id: number, property: IPropertyComponent) {
            return id > 0 && property != null;
        },
        edit(value: any, id: number) {
            return value != null && id > 0;
        },
    },
});
</script>

<style lang="scss" scoped>
.main-col {
    flex-grow: 1;
    display: flex;
    align-items: center;
}
</style>
