<template>
    <div class="big-frame">
        <div v-for="list in currentList" class="list-row">
            <div
                v-for="item in list"
                class="list-element"
                :style="elementStyle"
            >
                <ListElement
                    :item="item"
                    :name="_list.getName(item)"
                    :description="_list.getDescription(item)"
                    :image="_list.getImage(item)"
                    :width="elementWidth"
                    :height="elementHeight"
                    @name-click="(item) => _list.onItemClick(item)"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { BaseListObject, ListObject } from '@/component_logics/ListObject';
import { defineComponent, type StyleValue } from 'vue';
import ListElement from './ListElement.vue';

class Data {
    currentList: any[][] = [];
}

export default defineComponent({
    props: {
        list: {
            type: BaseListObject,
            required: true,
        },
        page: {
            type: Number,
            default: 1,
        },
        perLine: {
            type: Number,
            default: 5,
        },
        perPage: {
            type: Number,
            default: 20,
        },
        elementWidth: {
            type: String,
            default: '120px',
        },
        elementHeight: {
            type: String,
            default: '180px',
        },
    },
    data() {
        return new Data();
    },
    computed: {
        _list() {
            return this.list as ListObject;
        },
        elementStyle(): StyleValue {
            return {
                width: this.elementWidth,
                height: this.elementHeight,
            };
        },
    },
    methods: {
        lineItems(lineId: number) {
            if (this.perLine * lineId < this.currentList.length) {
                return this.perLine;
            }
            return this.currentList.length % lineId;
        },
        item(lineId: number, lineItemId: number) {
            return this.currentList[
                (lineId - 1) * this.perLine + lineItemId - 1
            ];
        },
    },
    components: { ListElement },
    async mounted() {
        const tempList: any[][] = [];
        const list = await this._list.get(this.page);

        let globalI = 0;
        for (;;) {
            const temp = [];
            for (let j = 0; j < this.perLine; j++) {
                temp.push(list[globalI]);
                globalI++;
                if (globalI >= list.length) {
                    break;
                }
            }
            tempList.push(temp);
            if (globalI >= list.length) {
                break;
            }
        }

        this.currentList = tempList;
    },
});
</script>

<style lang="scss" scoped>
.list-row-container {
    width: 100%;
}
.list-row {
    display: flex;
    flex-direction: row;
}

.list-element {
    margin: 5px;
}
</style>
