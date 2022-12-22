<template>
    <div class="card-content">
        <div class="column-container" v-for="item in cardTemplate.columns">
            <ColumnComponent
                :can-edit="canEdit"
                :column="item"
                :scripts="scripts"
                @init="onPropertyInit"
                @edit="onPropertyEdit"
            />
        </div>
    </div>
</template>

<script lang="ts">
import type { IPropertyComponent } from '@/component_logics/CardEditor';
import { useUserStore } from '@/stores/user';
import { useWSStore } from '@/stores/ws';
import Card from '@/trpg/card/Card';
import CardTemplate from '@/trpg/card_template/v2/CardTemplate';
import { defineComponent } from 'vue';
import ColumnComponent from './ColumnComponent.vue';

export default defineComponent({
    props: {
        card: {
            type: Card,
            required: true,
        },
        canEdit: {
            type: Boolean,
            default: false,
        },
        inGame: {
            type: Boolean,
            default: false,
        },
        user: String,
        cardTemplate: {
            type: CardTemplate,
            required: true,
        },
        scripts: {
            type: Array<string>,
            required: true,
        },
    },
    components: { ColumnComponent },
    data() {
        return {
            properties: new Map<number, IPropertyComponent>(),
        };
    },
    methods: {
        onPropertyInit(index: number, property: IPropertyComponent) {
            this.properties.set(index, property);
            let value: any;
            if ((value = this.card.properties.get(index)) == null) {
                this.card.properties.set(index, null);
            }
            property.setValue(value);
        },
        onPropertyEdit(value: any, index: number) {
            if (this.canEdit && !this.inGame) {
                this.card.properties.set(index, value);
            } else if (this.inGame && this.user != null) {
                useWSStore().socket.emitToSocket('room:edit_card', {
                    session: useUserStore().session,
                    user: this.user,
                    propertyId: index,
                    newValue: value,
                });
            }
        },
    },
});
</script>
