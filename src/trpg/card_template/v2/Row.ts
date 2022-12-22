import type { Property } from './Property';

export class Row {
    properties: Property[] = [];

    constructor(
        public id: number,
        public nameScriptId: number,
        public needCheck: boolean,
        public checkScriptId: number
    ) {}
}
