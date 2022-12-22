import { Area as AreaV1 } from './Area';
import TemplateV1 from './CardTemplate';
import { Column as ColumnV1 } from './Column';
import {
    BoolProperty,
    ButtonProperty,
    CalculatedBoolProperty,
    CalculatedFloatProperty,
    CalculatedIntProperty,
    CalculatedStringProperty,
    FloatProperty,
    ImageProperty,
    IntProperty,
    PropertyType,
    SelectionProperty,
    StringProperty,
    type Property as PropertyV1,
} from './Property';
import { Row as RowV1 } from './Row';
import { Area as AreaV2 } from './v2/Area';
import TemplateV2 from './v2/CardTemplate';
import { Column as ColumnV2 } from './v2/Column';
import {
    BoolProperty as BoolPropertyV2,
    ButtonProperty as ButtonPropertyV2,
    CalculatedBoolProperty as CalculatedBoolPropertyV2,
    CalculatedFloatProperty as CalculatedFloatPropertyV2,
    CalculatedIntProperty as CalculatedIntPropertyV2,
    CalculatedStringProperty as CalculatedStringPropertyV2,
    FloatProperty as FloatPropertyV2,
    ImageProperty as ImagePropertyV2,
    IntProperty as IntPropertyV2,
    SelectionProperty as SelectionPropertyV2,
    StringProperty as StringPropertyV2,
    type Property as PropertyV2,
} from './v2/Property';
import { Row as RowV2 } from './v2/Row';

interface TemplateWrapper {
    template: TemplateV2;
    scripts: string[];
}

export class TemplateBuilder {
    static v1Tov2(template: TemplateV1): TemplateWrapper {
        let scripts: string[] = [
            template.cardDescriptionScript,
            template.checkScript,
            template.inGameCardScript,
        ];

        const out = new TemplateV2(
            template.name,
            template.description,
            template.needCheck,
            1,
            template.coverPropertyId,
            0,
            2
        );

        template.columns.forEach((column) =>
            out.columns.push(this.v1ColumnToV2(column, scripts))
        );

        return {
            template: out,
            scripts: scripts,
        };
    }
    static v2Tov1(template: TemplateV2, scripts: string[]) {
        const out = new TemplateV1(
            template.name,
            template.description,
            template.needCheck,
            scripts[template.checkScriptId],
            template.coverPropertyId,
            scripts[template.cardDescriptionScriptId],
            scripts[template.inGameCardScriptId]
        );
        template.columns.forEach((column) =>
            out.columns.push(this.v2ColumnToV1(column, scripts))
        );
        return out;
    }
    private static v1ColumnToV2(column: ColumnV1, scripts: string[]) {
        let checkScriptId = scripts.length;
        scripts.push(column.checkScript);
        let nameScriptId = scripts.length;
        scripts.push(column.nameScript);
        const out = new ColumnV2(
            column.id,
            nameScriptId,
            column.needCheck,
            checkScriptId
        );
        column.areas.forEach((area) =>
            out.areas.push(this.v1AreaToV2(area, scripts))
        );
        return out;
    }
    private static v1AreaToV2(area: AreaV1, scripts: string[]) {
        let checkScriptId = scripts.length;
        scripts.push(area.checkScript);
        let nameScriptId = scripts.length;
        scripts.push(area.nameScript);
        const out = new AreaV2(
            area.id,
            nameScriptId,
            area.type,
            area.needCheck,
            checkScriptId,
            area.needManualCheck
        );
        area.rows.forEach((row) => out.rows.push(this.v1RowToV2(row, scripts)));
        return out;
    }
    private static v1RowToV2(row: RowV1, scripts: string[]) {
        let checkScriptId = scripts.length;
        scripts.push(row.checkScript);
        let nameScriptId = scripts.length;
        scripts.push(row.nameScript);
        const out = new RowV2(
            row.id,
            nameScriptId,
            row.needCheck,
            checkScriptId
        );
        row.properties.forEach((property) =>
            out.properties.push(this.v1PropertyToV2(property, scripts))
        );
        return out;
    }
    private static v1PropertyToV2(property: PropertyV1, scripts: string[]) {
        let nameScriptId = scripts.length;
        scripts.push(property.nameScript);
        if (property.type == PropertyType.BOOL) {
            let checkScriptId = scripts.length;
            scripts.push(property.checkScript);
            return new BoolPropertyV2(
                property.id,
                nameScriptId,
                property.needCheck,
                checkScriptId
            );
        } else if (property.type == PropertyType.BUTTON) {
            let clickScriptId = scripts.length;
            scripts.push(property.clickScript);
            let textScriptId = scripts.length;
            scripts.push(property.textScript);
            return new ButtonPropertyV2(
                property.id,
                nameScriptId,
                property.phase,
                textScriptId,
                clickScriptId
            );
        } else if (property.type == PropertyType.CALCULATED_BOOL) {
            let calculateScriptId = scripts.length;
            scripts.push(property.calculateScript);
            let checkScriptId = scripts.length;
            scripts.push(property.checkScript);
            return new CalculatedBoolPropertyV2(
                property.id,
                nameScriptId,
                calculateScriptId,
                property.needCheck,
                checkScriptId
            );
        } else if (property.type == PropertyType.CALCULATED_FLOAT) {
            let calculateScriptId = scripts.length;
            scripts.push(property.calculateScript);
            let checkScriptId = scripts.length;
            scripts.push(property.checkScript);
            let precisionScriptId = scripts.length;
            scripts.push(property.precisionScript);
            return new CalculatedFloatPropertyV2(
                property.id,
                nameScriptId,
                calculateScriptId,
                precisionScriptId,
                property.needCheck,
                checkScriptId
            );
        } else if (property.type == PropertyType.CALCULATED_INT) {
            let calculateScriptId = scripts.length;
            scripts.push(property.calculateScript);
            let checkScriptId = scripts.length;
            scripts.push(property.checkScript);
            return new CalculatedIntPropertyV2(
                property.id,
                nameScriptId,
                calculateScriptId,
                property.needCheck,
                checkScriptId
            );
        } else if (property.type == PropertyType.CALCULATED_STRING) {
            let calculateScriptId = scripts.length;
            scripts.push(property.calculateScript);
            let checkScriptId = scripts.length;
            scripts.push(property.checkScript);
            return new CalculatedStringPropertyV2(
                property.id,
                nameScriptId,
                calculateScriptId,
                property.needCheck,
                checkScriptId
            );
        } else if (property.type == PropertyType.FLOAT) {
            let checkScriptId = scripts.length;
            scripts.push(property.checkScript);
            let precisionScriptId = scripts.length;
            scripts.push(property.precisionScript);
            return new FloatPropertyV2(
                property.id,
                nameScriptId,
                precisionScriptId,
                property.needCheck,
                checkScriptId
            );
        } else if (property.type == PropertyType.IMAGE) {
            return new ImagePropertyV2(property.id, nameScriptId);
        } else if (property.type == PropertyType.INT) {
            let checkScriptId = scripts.length;
            scripts.push(property.checkScript);
            return new IntPropertyV2(
                property.id,
                nameScriptId,
                property.needCheck,
                checkScriptId
            );
        } else if (property.type == PropertyType.SELECTION) {
            let checkScriptId = scripts.length;
            scripts.push(property.checkScript);
            let valueClassScriptId = scripts.length;
            scripts.push(property.valueClassScript);
            return new SelectionPropertyV2(
                property.id,
                nameScriptId,
                valueClassScriptId,
                property.needCheck,
                checkScriptId
            );
        } else {
            let checkScriptId = scripts.length;
            scripts.push(property.checkScript);
            return new StringPropertyV2(
                property.id,
                nameScriptId,
                property.needCheck,
                checkScriptId
            );
        }
    }
    private static v2ColumnToV1(column: ColumnV2, scripts: string[]) {
        const out = new ColumnV1(
            column.id,
            scripts[column.nameScriptId],
            column.needCheck,
            scripts[column.checkScriptId]
        );
        column.areas.forEach((area) =>
            out.areas.push(this.v2AreaToV1(area, scripts))
        );
        return out;
    }
    private static v2AreaToV1(area: AreaV2, scripts: string[]) {
        const out = new AreaV1(
            area.id,
            scripts[area.nameScriptId],
            area.type,
            area.needCheck,
            scripts[area.checkScriptId],
            area.needManualCheck
        );
        area.rows.forEach((row) => out.rows.push(this.v2RowToV1(row, scripts)));
        return out;
    }
    private static v2RowToV1(row: RowV2, scripts: string[]) {
        const out = new RowV1(
            row.id,
            scripts[row.nameScriptId],
            row.needCheck,
            scripts[row.checkScriptId]
        );
        row.properties.forEach((property) =>
            out.properties.push(this.v2PropertyToV1(property, scripts))
        );
        return out;
    }
    private static v2PropertyToV1(property: PropertyV2, scripts: string[]) {
        if (property.type == PropertyType.BOOL) {
            return new BoolProperty(
                property.id,
                scripts[property.nameScriptId],
                property.needCheck,
                scripts[property.checkScriptId]
            );
        } else if (property.type == PropertyType.BUTTON) {
            return new ButtonProperty(
                property.id,
                scripts[property.nameScriptId],
                property.phase,
                scripts[property.textScriptId],
                scripts[property.clickScriptId]
            );
        } else if (property.type == PropertyType.CALCULATED_BOOL) {
            return new CalculatedBoolProperty(
                property.id,
                scripts[property.nameScriptId],
                scripts[property.calculateScriptId],
                property.needCheck,
                scripts[property.checkScriptId]
            );
        } else if (property.type == PropertyType.CALCULATED_FLOAT) {
            return new CalculatedFloatProperty(
                property.id,
                scripts[property.nameScriptId],
                scripts[property.calculateScriptId],
                scripts[property.precisionScriptId],
                property.needCheck,
                scripts[property.checkScriptId]
            );
        } else if (property.type == PropertyType.CALCULATED_INT) {
            return new CalculatedIntProperty(
                property.id,
                scripts[property.nameScriptId],
                scripts[property.calculateScriptId],
                property.needCheck,
                scripts[property.checkScriptId]
            );
        } else if (property.type == PropertyType.CALCULATED_STRING) {
            return new CalculatedStringProperty(
                property.id,
                scripts[property.nameScriptId],
                scripts[property.calculateScriptId],
                property.needCheck,
                scripts[property.checkScriptId]
            );
        } else if (property.type == PropertyType.FLOAT) {
            return new FloatProperty(
                property.id,
                scripts[property.nameScriptId],
                scripts[property.precisionScriptId],
                property.needCheck,
                scripts[property.checkScriptId]
            );
        } else if (property.type == PropertyType.IMAGE) {
            return new ImageProperty(
                property.id,
                scripts[property.nameScriptId]
            );
        } else if (property.type == PropertyType.INT) {
            return new IntProperty(
                property.id,
                scripts[property.nameScriptId],
                property.needCheck,
                scripts[property.checkScriptId]
            );
        } else if (property.type == PropertyType.SELECTION) {
            return new SelectionProperty(
                property.id,
                scripts[property.nameScriptId],
                scripts[property.valueClassScriptId],
                property.needCheck,
                scripts[property.checkScriptId]
            );
        } else {
            return new StringProperty(
                property.id,
                scripts[property.nameScriptId],
                property.needCheck,
                scripts[property.checkScriptId]
            );
        }
    }
}
