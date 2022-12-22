import type { Column } from './Column';

export default class CardTemplate {
    columns: Column[] = [];
    constructor(
        public name: string,
        public description: string,
        public needCheck: boolean,
        public checkScriptId: number,
        public coverPropertyId: number,
        public cardDescriptionScriptId: number,
        public inGameCardScriptId: number
    ) {}
}
