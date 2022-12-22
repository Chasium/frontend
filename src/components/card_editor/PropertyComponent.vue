<template>
    <div class="main-col">
        <div class="property-title">{{ name }}</div>
        <div class="property-main el-color-change">
            <el-input-number
                size="small"
                v-if="isNumProperty"
                v-model="value"
                :disabled="!canEdit"
            />
            <el-input
                size="small"
                v-else-if="isStringProperty"
                v-model="value"
                :disabled="!canEdit"
            />
            <el-switch
                size="small"
                v-else-if="isBoolProperty"
                v-model="value"
                :disabled="!canEdit"
            />
            <el-select
                size="small"
                v-else-if="isSelectProperty"
                v-model="value"
                :disabled="!canEdit"
            >
                <el-option
                    v-for="item in selection"
                    :key="item"
                    :label="item"
                    :value="item"
                />
            </el-select>
            <el-input
                size="small"
                readonly
                v-else-if="isCalculatedProperty"
                v-model="value"
                :disabled="!canEdit"
            />
            <el-avatar shape="square" v-else-if="isImageProperty"></el-avatar>
            <el-button
                v-else-if="isButtonProperty"
                size="small"
                class="button-property el-color-change"
                :disabled="!canEdit"
            >
                {{ buttonText }}
            </el-button>
        </div>
    </div>
</template>

<script lang="ts">
import type { IPropertyComponent } from '@/component_logics/CardEditor';
import {
    CalculatedIntProperty,
    PropertyType,
    type Property,
} from '@/trpg/card_template/v2/Property';
import EvalScript from '@/trpg/script/EvalScript';
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        canEdit: {
            type: Boolean,
            default: false,
        },
        templateProperty: {
            type: Object,
            required: true,
        },
        scripts: {
            type: Object,
            required: true,
        },
        itemWidth: {},
    },
    data() {
        return {
            value: 0 as any,
        };
    },
    computed: {
        propertyObj() {
            return this.templateProperty as Property;
        },
        isNumProperty() {
            const type = this.propertyObj.type;
            return type == PropertyType.INT || type == PropertyType.FLOAT;
        },
        isStringProperty() {
            return this.propertyObj.type == PropertyType.STRING;
        },
        isBoolProperty() {
            return this.propertyObj.type == PropertyType.BOOL;
        },
        isSelectProperty() {
            return this.propertyObj.type == PropertyType.SELECTION;
        },
        isCalculatedProperty() {
            const type = this.propertyObj.type;
            return (
                type == PropertyType.CALCULATED_INT ||
                type == PropertyType.CALCULATED_FLOAT ||
                type == PropertyType.CALCULATED_BOOL ||
                type == PropertyType.CALCULATED_STRING
            );
        },
        isImageProperty() {
            return this.propertyObj.type == PropertyType.IMAGE;
        },
        isButtonProperty() {
            return this.propertyObj.type == PropertyType.BUTTON;
        },
        name() {
            try {
                return new EvalScript(
                    this.scriptsObj[this.propertyObj.nameScriptId]
                ).run();
            } catch (e) {
                return '';
            }
        },
        buttonText() {
            if (this.propertyObj.type == PropertyType.BUTTON) {
                return new EvalScript(
                    this.scriptsObj[this.propertyObj.textScriptId]
                ).run();
            }
            return '';
        },
        selection(): string[] {
            if (this.propertyObj.type == PropertyType.SELECTION) {
                return new EvalScript(
                    this.scriptsObj[this.propertyObj.valueClassScriptId]
                ).run();
            }
            return [];
        },
        scriptsObj() {
            return this.scripts as string[];
        },
    },
    methods: {
        calculate() {
            if (this.isCalculatedProperty) {
                this.value = new EvalScript(
                    this.scriptsObj[
                        (
                            this.propertyObj as CalculatedIntProperty
                        ).calculateScriptId
                    ]
                ).run();
            }
        },
        getValue() {
            return this.value;
        },
        setValue(value: any) {
            this.value = value;
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
    mounted() {
        this.$emit('init', this.propertyObj.id, this);
    },
    watch: {
        value(newValue) {
            this.$emit('edit', newValue, this.propertyObj.id);
        },
    },
});
</script>

<style lang="scss" scoped>
.main-col {
    width: min-content;
}

.property-title {
    margin: 2px;
    min-width: 3em;
    min-height: 1.2em;
    line-height: 1.2em;
    text-align: center;
}

.property-main {
    margin: 2px;
    display: flex;
    justify-content: center;
}
</style>
