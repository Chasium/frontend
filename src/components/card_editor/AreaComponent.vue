<template>
    <div class="main-row">
        <div class="row-container" v-for="item in areaObj.rows">
            <RowComponent
                :can-edit="canEdit"
                :row="item"
                :scripts="scripts"
                @init="onPropertyInit"
                @edit="onPropertyEdit"
            ></RowComponent>
        </div>
    </div>
</template>

<script lang="ts">
import type { IPropertyComponent } from '@/component_logics/CardEditor';
import type { Area } from '@/trpg/card_template/v2/Area';
import { defineComponent } from 'vue';
import RowComponent from './RowComponent.vue';

export default defineComponent({
    props: {
        canEdit: {
            type: Boolean,
            default: false,
        },
        area: {
            type: Object,
            required: true,
        },
        scripts: {
            type: Object,
            required: true,
        },
    },
    components: { RowComponent },
    computed: {
        areaObj(): Area {
            return this.area as Area;
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
.main-row {
    display: inline;
}

.row-container {
    margin: 4px;
}
</style>
