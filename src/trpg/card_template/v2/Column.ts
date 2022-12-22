import type { Area } from './Area';

export class Column {
    areas: Area[] = [];
    constructor(
        public id: number,
        public nameScriptId: number,
        public needCheck: boolean,
        public checkScriptId: number
    ) {}
}
