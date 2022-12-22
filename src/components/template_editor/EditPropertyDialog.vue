<template>
    <el-dialog v-model="isCard">
        <CardEdit ref="card-edit" @close="isCard = false" />
    </el-dialog>
    <el-dialog v-model="isColumn"></el-dialog>
    <el-dialog v-model="isArea"></el-dialog>
    <el-dialog v-model="isRow"></el-dialog>
    <el-dialog v-model="isProperty">
        <PropertyEdit ref="property-edit" @close="isProperty = false" />
    </el-dialog>
</template>

<script lang="ts">
import { NodeType, type Tree } from '@/trpg/card_template/Tree';
import { refHelper } from '@/utils/refHelper';
import { defineComponent } from 'vue';
import CardEdit from './CardEdit.vue';
import PropertyEdit from './PropertyEdit.vue';

class Data {
    isCard = false;
    isColumn = false;
    isArea = false;
    isRow = false;
    isProperty = false;
    currentNode?: Tree = undefined;
}

export default defineComponent({
    data() {
        return new Data();
    },
    computed: {
        cardEdit() {
            return refHelper(this, 'card-edit', CardEdit);
        },
        propertyEdit() {
            return refHelper(this, 'property-edit', PropertyEdit);
        },
    },
    components: { CardEdit, PropertyEdit },
    methods: {
        open(node: Tree) {
            this.currentNode = node;
            if (node.type == NodeType.CARD) {
                this.isCard = true;
                setTimeout(() => this.cardEdit.open(node), 10);
            } else if (node.type == NodeType.COLUMN) {
                this.isColumn = true;
            } else if (node.type == NodeType.AREA) {
                this.isArea = true;
            } else if (node.type == NodeType.ROW) {
                this.isRow = true;
            } else if (node.type == NodeType.PROPERTY) {
                this.isProperty = true;
                setTimeout(() => this.propertyEdit.open(node), 10);
            }
        },
    },
});
</script>

<style lang="scss" scoped></style>
