<template>
   <ListComponent :list="modList" :page="currentPage" />
</template>

<script lang="ts">
import { HTTPApi } from '@/apigen';
import type { Mod } from '@/apigen/generated/mod/get_mods';
import { defineComponent } from 'vue';
import ListComponent from '@/components/list/ListComponent.vue';
import { ListObject } from '@/component_logics/ListObject';
import { useUserStore } from '@/stores/user';

class ModList extends ListObject<Mod> {
    private gotPages = -1;
    async pages(): Promise<number> {
        if (this.gotPages < 0) {
            this.gotPages = (
                await HTTPApi.post('/mod/get-mods', {
                    session: useUserStore().session,
                    page: 1,
                    pageSize: this.perPage,
                })
            ).pages;
        }
        return this.gotPages;
    }
    async get(page: number): Promise<Mod[]> {
        return (
            await HTTPApi.post('/mod/get-mods', {
                session: useUserStore().session,
                page: page,
                pageSize: this.perPage,
            })
        ).mods;
    }
    getName(item: Mod): string {
        return item.name;
    }
    getImage(item: Mod): string {return ''}
    getDescription(item: Mod): string {return ''}
    onItemClick(item: Mod): void {}
}

export default defineComponent({
    components: { ListComponent },
    data() {
        return {
            modList: new ModList(),
            currentPage: 1,
        };
    },
});
</script>
 