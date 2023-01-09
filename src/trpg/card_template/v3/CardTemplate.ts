import { column } from 'element-plus/es/components/table-v2/src/common';
import type CardTemplateV2 from '../v2/CardTemplate';
import type { Property } from '../v2/Property';

export default class CardTemplate {
    readonly properties = new Map<number, Property>();
    constructor(readonly v2: CardTemplateV2) {
        v2.columns.forEach((column) => {
            column.areas.forEach((area) => {
                area.rows.forEach((row) => {
                    row.properties.forEach((property) => {
                        this.properties.set(property.id, property);
                    });
                });
            });
        });
    }
}
