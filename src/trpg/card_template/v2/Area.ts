import type { Row } from './Row';

export enum AreaType {
    PERMANENT,
    IN_GAME,
}

export class Area {
    rows: Row[] = [];
    constructor(
        public id: number,
        public nameScriptId: number,
        public type: AreaType,
        public needCheck: boolean,
        public checkScriptId: number,
        public needManualCheck: boolean
    ) {}
}
